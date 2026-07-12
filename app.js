const OWNER_USERNAME="jaduu";
const ACHIEVEMENTS={
    level_10:{name:"First Steps",icon:"\u{1F9B6}",desc:"Reach level 10"},
    level_25:{name:"Quarter Way",icon:"\u{1F4CA}",desc:"Reach level 25"},
    level_50:{name:"Half Way",icon:"\u{1F525}",desc:"Reach level 50"},
    level_75:{name:"Almost There",icon:"\u{1F4AA}",desc:"Reach level 75"},
    level_100:{name:"Smartest",icon:"\u{1F3C6}",desc:"Complete all 100 levels"},
    level_250:{name:"Overachiever",icon:"\u{1F929}",desc:"Reach level 250"},
    level_500:{name:"Puzzle Maniac",icon:"\u{1F9E0}",desc:"Reach level 500"},
    level_1000:{name:"Champion",icon:"\u{1F451}",desc:"Reach level 1000"},
    streak_5:{name:"On Fire",icon:"\u{1F525}",desc:"5 correct in a row"},
    streak_10:{name:"Streak Master",icon:"\u26A1",desc:"10 correct in a row"},
    streak_25:{name:"Unstoppable",icon:"\u{1F31F}",desc:"25 correct in a row"},
    streak_50:{name:"Perfect Mind",icon:"\u{1F9E0}",desc:"50 correct in a row"},
    streak_100:{name:"Century Streak",icon:"\u2B50",desc:"100 correct in a row"},
    speed_5:{name:"Speed Demon",icon:"\u23F1\uFE0F",desc:"Solve in under 5 seconds"},
    speed_3:{name:"Lightning Fast",icon:"\u26A1",desc:"Solve in under 3 seconds"},
    infinite_10:{name:"Infinite Beginner",icon:"\u267E\uFE0F",desc:"10 infinite levels"},
    infinite_25:{name:"Infinite Explorer",icon:"\u{1F680}",desc:"25 infinite levels"},
    infinite_50:{name:"Infinite Master",icon:"\u{1F451}",desc:"50 infinite levels"},
    infinite_100:{name:"Infinite Legend",icon:"\u{1F48E}",desc:"100 infinite levels"},
    infinite_200:{name:"Infinite Champion",icon:"\u{1F3C6}",desc:"200 infinite levels"},
    infinite_500:{name:"Infinite God",icon:"\u2728",desc:"500 infinite levels"},
    score_500:{name:"Score Hunter",icon:"\u{1F3AF}",desc:"Reach 500 points"},
    score_1000:{name:"Score King",icon:"\u{1F4B0}",desc:"Reach 1000 points"},
    score_5000:{name:"Score Legend",icon:"\u{1F3C5}",desc:"Reach 5000 points"},
    score_10000:{name:"Score Immortal",icon:"\u{1F48E}",desc:"Reach 10000 points"},
    first_clear:{name:"Clean Sweep",icon:"\u2728",desc:"Complete a level without hints"},
};

const sb=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);

let currentUser=null;
let userRole="user";
let gameState={
    current_level:1,highest_reached:1,score:0,streak:0,best_streak:0,
    total_correct:0,total_wrong:0,total_time_played:0,
    trophy_unlocked:false,infinite_level:0,
    hint_used:false,visualLocked:false,session_start:null,
    timer_interval:null,solve_start:null,no_hints_this_level:true,currentPuzzle:null,
};

// SUPABASE HELPERS
async function dbGetUser(username){
    const{data}=await sb.from("users").select("*").eq("username",username).single();
    return data;
}
async function dbCreateUser(username,hash,salt,role){
    const{data,error}=await sb.from("users").insert({username,password_hash:hash,salt:salt,role:role}).select().single();
    if(error)throw error;
    await sb.from("game_saves").insert({user_id:data.id});
    return data;
}
async function dbUpdateUserRole(username,role){
    await sb.from("users").update({role:role}).eq("username",username);
}
async function dbGetSave(username){
    const{data:user}=await sb.from("users").select("id").eq("username",username).single();
    if(!user)return null;
    const{data}=await sb.from("game_saves").select("*").eq("user_id",user.id).single();
    return data;
}
async function dbSetSave(username,save){
    const{data:user}=await sb.from("users").select("id").eq("username",username).single();
    if(!user)return;
    await sb.from("game_saves").update({
        current_level:save.current_level,highest_reached:save.highest_reached,
        score:save.score,streak:save.streak,best_streak:save.best_streak,
        total_correct:save.total_correct,total_wrong:save.total_wrong,
        total_time_played:save.total_time_played,trophy_unlocked:save.trophy_unlocked?1:0,
        infinite_level:save.infinite_level,updated_at:new Date().toISOString()
    }).eq("user_id",user.id);
}
async function dbGetAchievements(username){
    const{data:user}=await sb.from("users").select("id").eq("username",username).single();
    if(!user)return[];
    const{data}=await sb.from("achievements").select("achievement_key").eq("user_id",user.id);
    return(data||[]).map(r=>r.achievement_key);
}
async function dbAddAchievement(username,key){
    const{data:user}=await sb.from("users").select("id").eq("username",username).single();
    if(!user)return;
    await sb.from("achievements").insert({user_id:user.id,achievement_key:key}).select();
}
async function dbGetAllUsers(){
    const{data}=await sb.from("users").select("id,username,role,created_at");
    return data||[];
}
async function dbGetAllSaves(){
    const{data}=await sb.from("game_saves").select("*");
    return data||[];
}
async function dbDeleteUser(username){
    const{data:user}=await sb.from("users").select("id").eq("username",username).single();
    if(!user)return;
    await sb.from("achievements").delete().eq("user_id",user.id);
    await sb.from("game_saves").delete().eq("user_id",user.id);
    await sb.from("users").delete().eq("id",user.id);
}

async function hashPassword(password,salt){
    const enc=new TextEncoder();
    const km=await crypto.subtle.importKey("raw",enc.encode(password),"PBKDF2",false,["deriveBits"]);
    const bits=await crypto.subtle.deriveBits({name:"PBKDF2",salt:enc.encode(salt),iterations:100000,hash:"SHA-256"},km,256);
    return Array.from(new Uint8Array(bits)).map(b=>b.toString(16).padStart(2,"0")).join("");
}

function defaultSave(){
    return{current_level:1,highest_reached:1,score:0,streak:0,best_streak:0,
    total_correct:0,total_wrong:0,total_time_played:0,trophy_unlocked:false,infinite_level:0};
}

// SCREEN HELPERS
function showScreen(id){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    const el=document.getElementById(id);if(el)el.classList.add("active");
}
function backToMenu(){
    if(gameState.timer_interval)clearInterval(gameState.timer_interval);
    showScreen("screen-menu");refreshMenuInfo();
}
function showLoading(){document.getElementById("loading").classList.remove("hidden");}
function hideLoading(){document.getElementById("loading").classList.add("hidden");}

// AUTH
let authMode="login";
function showAuthTab(mode){
    authMode=mode;
    document.querySelectorAll(".auth-tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".auth-tab")[mode==="login"?0:1].classList.add("active");
    document.getElementById("auth-submit").textContent=mode==="login"?"Login":"Create Account";
    document.getElementById("auth-error").textContent="";
}

async function handleAuth(e){
    e.preventDefault();
    const u=document.getElementById("auth-username").value.trim();
    const p=document.getElementById("auth-password").value;
    const err=document.getElementById("auth-error");
    err.textContent="";
    if(!u||!p){err.textContent="Enter username and password";return;}
    if(u.length<3){err.textContent="Username must be 3+ characters";return;}
    if(p.length<4){err.textContent="Password must be 4+ characters";return;}

    showLoading();
    try{
        if(authMode==="register"){
            const existing=await dbGetUser(u);
            if(existing){hideLoading();err.textContent="Username already taken";return;}
            const salt=crypto.randomUUID();
            const hash=await hashPassword(p,salt);
            const role=u.toLowerCase()===OWNER_USERNAME?"owner":"user";
            await dbCreateUser(u,hash,salt,role);
            currentUser=u;userRole=role;
        }else{
            const user=await dbGetUser(u);
            if(!user){hideLoading();err.textContent="User not found";return;}
            const hash=await hashPassword(p,user.salt);
            if(hash!==user.password_hash){hideLoading();err.textContent="Wrong password";return;}
            currentUser=u;userRole=user.role||"user";
        }
        localStorage.setItem("qc_user",currentUser);
        document.getElementById("menu-username").textContent=currentUser;
        document.getElementById("btn-admin-menu").classList.toggle("hidden",!["owner","admin"].includes(userRole));
        if(userRole==="owner")await ensureOwnerRole();
        hideLoading();showScreen("screen-menu");refreshMenuInfo();
    }catch(ex){hideLoading();err.textContent="Error: "+ex.message;}
}

function doLogout(){
    currentUser=null;userRole="user";
    localStorage.removeItem("qc_user");
    gameState={current_level:1,highest_reached:1,score:0,streak:0,best_streak:0,
        total_correct:0,total_wrong:0,total_time_played:0,trophy_unlocked:false,infinite_level:0,
        hint_used:false,visualLocked:false,session_start:null,timer_interval:null,solve_start:null,
        no_hints_this_level:true,currentPuzzle:null};
    showScreen("screen-auth");
}

// MENU
async function refreshMenuInfo(){
    if(!currentUser)return;
    document.getElementById("menu-username").textContent=currentUser;
    const save=await dbGetSave(currentUser)||defaultSave();
    const cont=document.getElementById("menu-continue-info");
    if(save.current_level>1||save.highest_reached>1){
        cont.classList.remove("hidden");
        const lvl=save.current_level>100?`Inf Lv.${save.current_level-100}`:`Level ${save.current_level}`;
        cont.innerHTML=`Continue from ${lvl} | Score: ${save.score} | Best Streak: ${save.best_streak}`;
    }else{cont.classList.add("hidden");}
    document.getElementById("btn-admin-menu").classList.toggle("hidden",!["owner","admin"].includes(userRole));
}

// GAME
async function playNewGame(){
    if(!currentUser)return;
    showLoading();
    const save=defaultSave();
    await dbSetSave(currentUser,save);
    gameState={...save,hint_used:false,visualLocked:false,session_start:Date.now(),
        timer_interval:null,solve_start:null,no_hints_this_level:true,currentPuzzle:null};
    hideLoading();startLevel(gameState.current_level);
}

async function continueGame(){
    if(!currentUser)return;
    showLoading();
    const save=await dbGetSave(currentUser)||defaultSave();
    gameState={...save,hint_used:false,visualLocked:false,session_start:Date.now(),
        timer_interval:null,solve_start:null,no_hints_this_level:true,currentPuzzle:null};
    hideLoading();
    if(gameState.infinite_level>0){
        startInfiniteMode();
    }else{
        startLevel(gameState.current_level);
    }
}

function startLevel(level){
    showScreen("screen-game");
    const lvlEl=document.getElementById("current-level");
    const totalEl=document.getElementById("level-total");
    const progressBar=document.getElementById("progress-bar");

    if(level<=100){
        lvlEl.textContent=level;totalEl.textContent="/ 100";
        progressBar.style.width=level+"%";
    }else{
        lvlEl.textContent=level-100;totalEl.textContent="/ \u221E";
        progressBar.style.width="100%";
    }

    document.getElementById("score-display").textContent=gameState.score;
    document.getElementById("streak-display").textContent=gameState.streak;

    gameState.hint_used=false;gameState.no_hints_this_level=true;
    gameState.visualLocked=false;gameState.solve_start=Date.now();

    document.getElementById("puzzle-hint").classList.add("hidden");
    document.getElementById("btn-hint").style.display="";
    document.getElementById("visual-container").classList.add("hidden");
    document.getElementById("visual-container").innerHTML="";
    document.getElementById("stroop-container").classList.add("hidden");
    document.getElementById("rebus-container").classList.add("hidden");
    const ac=document.getElementById("answers-container");
    ac.innerHTML="";delete ac.dataset.answered;
    document.getElementById("text-input-container").classList.add("hidden");
    document.getElementById("text-answer").value="";

    let puzzle;
    if(level<=100){
        puzzle=PUZZLES[level-1];
    }else{
        puzzle=generateInfinitePuzzle(level);
    }
    gameState.currentPuzzle=puzzle;

    updateDifficultyBadge(level>100?100:level);
    document.getElementById("puzzle-category").textContent=puzzle.category;
    document.getElementById("puzzle-question").textContent=puzzle.question;

    if(puzzle.type==="visual"){
        renderVisualPuzzle(puzzle);
    }else{
        renderMultipleChoice(puzzle);
    }

    if(gameState.timer_interval)clearInterval(gameState.timer_interval);
    gameState.timer_interval=setInterval(()=>{
        if(!gameState.solve_start)return;
        const elapsed=Math.floor((Date.now()-gameState.solve_start)/1000);
        document.getElementById("timer-display").textContent=formatTime(elapsed);
    },1000);
    document.getElementById("timer-display").textContent="00:00";
}

function renderVisualPuzzle(puzzle){
    switch(puzzle.visualType){
        case"odd_one_out":renderOddOneOut(puzzle);break;
        case"count_objects":renderCountObjects(puzzle);break;
        case"find_hidden":renderFindHidden(puzzle);break;
        case"visual_pattern":renderVisualPattern(puzzle);break;
        case"stroop_test":renderStroopTest(puzzle);break;
        case"emoji_rebus":renderEmojiRebus(puzzle);break;
    }
}

function renderOddOneOut(puzzle){
    const vc=document.getElementById("visual-container");
    vc.classList.remove("hidden");vc.innerHTML="";
    const grid=document.createElement("div");
    grid.className="visual-grid";
    grid.style.gridTemplateColumns=`repeat(${puzzle.cols},1fr)`;
    puzzle.grid.forEach((emoji,i)=>{
        const cell=document.createElement("div");
        cell.className="visual-cell";cell.textContent=emoji;
        cell.onclick=()=>{
            if(gameState.visualLocked)return;
            gameState.visualLocked=true;
            if(i===puzzle.answer)answerCorrect();
            else answerWrong();
        };
        grid.appendChild(cell);
    });
    vc.appendChild(grid);
}

function renderCountObjects(puzzle){
    const vc=document.getElementById("visual-container");
    vc.classList.remove("hidden");vc.innerHTML="";
    const grid=document.createElement("div");
    grid.className="visual-grid";
    grid.style.gridTemplateColumns=`repeat(${puzzle.cols},1fr)`;
    puzzle.grid.forEach(emoji=>{
        const cell=document.createElement("div");
        cell.className="visual-cell";cell.textContent=emoji;
        grid.appendChild(cell);
    });
    vc.appendChild(grid);

    const ia=document.createElement("div");
    ia.className="count-input-area";
    ia.innerHTML=`<p>Enter your count:</p><input type="number" id="count-answer" class="admin-input" min="0"><button class="admin-action-btn" onclick="submitCountAnswer()">Submit</button>`;
    vc.appendChild(ia);
}

function submitCountAnswer(){
    if(document.getElementById("answers-container").dataset.answered)return;
    document.getElementById("answers-container").dataset.answered="1";
    const v=parseInt(document.getElementById("count-answer").value);
    if(isNaN(v)){delete document.getElementById("answers-container").dataset.answered;return;}
    if(v===gameState.currentPuzzle.answer)answerCorrect();
    else answerWrong();
}

function renderFindHidden(puzzle){
    const vc=document.getElementById("visual-container");
    vc.classList.remove("hidden");vc.innerHTML="";
    const grid=document.createElement("div");
    grid.className="visual-grid";
    grid.style.gridTemplateColumns=`repeat(${puzzle.cols},1fr)`;
    puzzle.grid.forEach((emoji,i)=>{
        const cell=document.createElement("div");
        cell.className="visual-cell";cell.textContent=emoji;
        cell.onclick=()=>{
            if(gameState.visualLocked)return;
            gameState.visualLocked=true;
            if(i===puzzle.answer)answerCorrect();
            else answerWrong();
        };
        grid.appendChild(cell);
    });
    vc.appendChild(grid);
}

function renderVisualPattern(puzzle){
    const vc=document.getElementById("visual-container");
    vc.classList.remove("hidden");vc.innerHTML="";
    const pat=document.createElement("div");
    pat.className="pattern-display";
    pat.style.display="flex";pat.style.gap="8px";pat.style.flexWrap="wrap";
    pat.style.justifyContent="center";pat.style.fontSize="2rem";pat.style.marginBottom="20px";
    puzzle.pattern.forEach(p=>{
        const sp=document.createElement("span");
        sp.textContent=p;sp.style.padding="5px";
        if(p==="?"){sp.style.background="rgba(255,255,255,0.2)";sp.style.borderRadius="8px";sp.style.fontWeight="bold";}
        pat.appendChild(sp);
    });
    vc.appendChild(pat);
    renderMultipleChoice(puzzle);
}

function renderStroopTest(puzzle){
    const sc=document.getElementById("stroop-container");
    sc.classList.remove("hidden");
    document.getElementById("stroop-text").textContent=puzzle.stroopWord;
    document.getElementById("stroop-text").style.color=puzzle.stroopColor;
    renderMultipleChoice(puzzle);
}

function renderEmojiRebus(puzzle){
    const rc=document.getElementById("rebus-container");
    rc.classList.remove("hidden");
    document.getElementById("rebus-emojis").innerHTML=puzzle.reEmojis.map(e=>`<span style="font-size:3rem">${e}</span>`).join(" + ");
    renderMultipleChoice(puzzle);
}

function renderMultipleChoice(puzzle){
    const ac=document.getElementById("answers-container");
    ac.innerHTML="";delete ac.dataset.answered;
    if(!puzzle.options){return;}
    puzzle.options.forEach((opt,i)=>{
        const btn=document.createElement("button");
        btn.className="answer-btn";
        btn.textContent=opt;
        btn.onclick=()=>{
            if(ac.dataset.answered)return;
            ac.dataset.answered="1";
            if(i===puzzle.answer)answerCorrect();
            else answerWrong();
        };
        ac.appendChild(btn);
    });
}

function showHint(){
    if(!gameState.currentPuzzle)return;
    const hint=document.getElementById("puzzle-hint");
    hint.textContent="Hint: "+gameState.currentPuzzle.hint;
    hint.classList.remove("hidden");
    document.getElementById("btn-hint").style.display="none";
    gameState.hint_used=true;gameState.no_hints_this_level=false;
}

function submitTextAnswer(){
    if(document.getElementById("answers-container").dataset.answered)return;
    document.getElementById("answers-container").dataset.answered="1";
    const v=document.getElementById("text-answer").value.trim().toLowerCase();
    if(!v){delete document.getElementById("answers-container").dataset.answered;return;}
    const p=gameState.currentPuzzle;
    if(!p)return;
    if(v===String(p.answer).toLowerCase()||v===p.rebusAnswer?.toLowerCase())answerCorrect();
    else answerWrong();
}

async function answerCorrect(){
    if(gameState.timer_interval)clearInterval(gameState.timer_interval);
    const elapsed=gameState.solve_start?Math.floor((Date.now()-gameState.solve_start)/1000):0;
    animateCorrect();
    gameState.total_correct++;
    gameState.streak++;
    if(gameState.streak>gameState.best_streak)gameState.best_streak=gameState.streak;

    let pts=10;
    if(elapsed<=3)pts=30;
    else if(elapsed<=5)pts=25;
    else if(elapsed<=10)pts=20;
    else if(elapsed<=30)pts=15;

    if(gameState.current_level>100){
        gameState.infinite_level++;
        pts+=Math.floor(gameState.infinite_level/5)*5;
    }
    pts+=Math.floor(gameState.streak/5)*5;
    gameState.score+=pts;

    const newAch=await checkAchievements();
    const msg=`+${pts} points!${gameState.streak>=5?` Streak: ${gameState.streak}!`:``}`;
    document.getElementById("correct-message").textContent=msg;
    document.getElementById("achievement-popup").innerHTML="";
    if(newAch.length>0){
        newAch.forEach(k=>{
            const a=ACHIEVEMENTS[k];
            const d=document.createElement("div");
            d.className="achievement-popup-item";
            d.innerHTML=`${a.icon} ${a.name}`;
            document.getElementById("achievement-popup").appendChild(d);
        });
        document.getElementById("achievement-popup").classList.remove("hidden");
    }else{
        document.getElementById("achievement-popup").classList.add("hidden");
    }
    launchConfetti();
    showScreen("screen-correct");
}

function answerWrong(){
    if(gameState.timer_interval)clearInterval(gameState.timer_interval);
    animateWrong();
    gameState.total_wrong++;
    gameState.streak=0;
    const p=gameState.currentPuzzle;
    let reveal="";
    if(p.type==="visual"&&p.visualType==="count_objects"){
        reveal=`The answer was ${p.answer}.`;
    }else if(p.type==="visual"&&(p.visualType==="odd_one_out"||p.visualType==="find_hidden")){
        reveal=`It was at position ${p.answer+1}!`;
    }else if(p.answer!==undefined&&p.options){
        reveal=`Correct answer: ${p.options[p.answer]}`;
    }
    if(p.explanation)reveal+=` ${p.explanation}`;
    document.getElementById("wrong-answer-reveal").textContent=reveal;
    showScreen("screen-wrong");
}

async function nextLevel(){
    if(gameState.current_level<=100){
        gameState.current_level++;
        if(gameState.current_level>gameState.highest_reached)gameState.highest_reached=gameState.current_level;
        if(gameState.current_level>100){
            gameState.trophy_unlocked=true;
            await dbSetSave(currentUser,gameState);
            showTrophy();
            return;
        }
    }else{
        gameState.current_level++;
    }
    await saveProgress();
    startLevel(gameState.current_level);
}

async function retryLevel(){
    await saveProgress();
    startLevel(gameState.current_level);
}

async function showTrophy(){
    await dbSetSave(currentUser,gameState);
    document.getElementById("final-score").textContent=gameState.score;
    const totalSec=Math.floor((Date.now()-gameState.session_start)/1000)+gameState.total_time_played;
    document.getElementById("final-time").textContent=formatTime(totalSec);
    launchTrophyConfetti();
    showScreen("screen-trophy");
}

async function startInfiniteMode(){
    gameState.current_level=Math.max(gameState.current_level,101);
    if(gameState.infinite_level===0)gameState.infinite_level=1;
    await dbSetSave(currentUser,gameState);
    startLevel(gameState.current_level);
}

async function saveProgress(){
    if(!currentUser)return;
    gameState.total_time_played+=Math.floor((Date.now()-gameState.session_start)/1000);
    gameState.session_start=Date.now();
    await dbSetSave(currentUser,gameState);
}

async function saveAndQuit(){
    await saveProgress();
    backToMenu();
}

// ACHIEVEMENTS
async function checkAchievements(){
    if(!currentUser)return[];
    const unlocked=await dbGetAchievements(currentUser);
    const newUnlocked=[];
    const checks=[
        ["level_10",()=>gameState.highest_reached>=10],
        ["level_25",()=>gameState.highest_reached>=25],
        ["level_50",()=>gameState.highest_reached>=50],
        ["level_75",()=>gameState.highest_reached>=75],
        ["level_100",()=>gameState.highest_reached>=100],
        ["level_250",()=>gameState.highest_reached>=250],
        ["level_500",()=>gameState.highest_reached>=500],
        ["level_1000",()=>gameState.highest_reached>=1000],
        ["streak_5",()=>gameState.best_streak>=5],
        ["streak_10",()=>gameState.best_streak>=10],
        ["streak_25",()=>gameState.best_streak>=25],
        ["streak_50",()=>gameState.best_streak>=50],
        ["streak_100",()=>gameState.best_streak>=100],
        ["speed_5",()=>{
            if(!gameState.solve_start)return false;
            const e=(Date.now()-gameState.solve_start)/1000;
            return e<=5&&gameState.no_hints_this_level;
        }],
        ["speed_3",()=>{
            if(!gameState.solve_start)return false;
            const e=(Date.now()-gameState.solve_start)/1000;
            return e<=3&&gameState.no_hints_this_level;
        }],
        ["infinite_10",()=>gameState.infinite_level>=10],
        ["infinite_25",()=>gameState.infinite_level>=25],
        ["infinite_50",()=>gameState.infinite_level>=50],
        ["infinite_100",()=>gameState.infinite_level>=100],
        ["infinite_200",()=>gameState.infinite_level>=200],
        ["infinite_500",()=>gameState.infinite_level>=500],
        ["score_500",()=>gameState.score>=500],
        ["score_1000",()=>gameState.score>=1000],
        ["score_5000",()=>gameState.score>=5000],
        ["score_10000",()=>gameState.score>=10000],
        ["first_clear",()=>gameState.no_hints_this_level&&gameState.total_correct>0],
    ];
    for(const[key,fn]of checks){
        if(!unlocked.includes(key)&&fn()){
            await dbAddAchievement(currentUser,key);
            newUnlocked.push(key);
        }
    }
    return newUnlocked;
}

async function showAchievements(){
    const grid=document.getElementById("achievements-grid");
    grid.innerHTML="";
    let unlocked=[];
    if(currentUser)unlocked=await dbGetAchievements(currentUser);
    for(const[key,a]of Object.entries(ACHIEVEMENTS)){
        const d=document.createElement("div");
        const has=unlocked.includes(key);
        d.className="achievement-card"+(has?" unlocked":" locked");
        d.innerHTML=`<div class="achievement-icon">${has?a.icon:"🔒"}</div><div class="achievement-name">${a.name}</div><div class="achievement-desc">${a.desc}</div>`;
        grid.appendChild(d);
    }
    showScreen("screen-achievements");
}

// LEADERBOARD
async function getAllLeaderboardData(){
    const users=await dbGetAllUsers();
    const saves=await dbGetAllSaves();
    return users.map(u=>{
        const s=saves.find(sv=>sv.user_id===u.id)||{};
        return{
            username:u.username,role:u.role,
            highest_reached:s.highest_reached||1,score:s.score||0,
            best_streak:s.best_streak||0,total_time_played:s.total_time_played||0
        };
    });
}

async function showLeaderboard(){
    const data=await getAllLeaderboardData();
    renderLeaderboard(data,"level");
    showScreen("screen-leaderboard");
}

let lbData=[];
async function showLBTab(sort,el){
    document.querySelectorAll(".lb-tab").forEach(t=>t.classList.remove("active"));
    el.classList.add("active");
    if(lbData.length===0)lbData=await getAllLeaderboardData();
    renderLeaderboard(lbData,sort);
}

async function renderLeaderboard(data,sort){
    if(data.length===0&&lbData.length===0)lbData=await getAllLeaderboardData();
    const d=data.length>0?data:lbData;
    const sorted=[...d].sort((a,b)=>{
        if(sort==="level")return b.highest_reached-a.highest_reached||b.score-a.score;
        if(sort==="score")return b.score-a.score;
        if(sort==="time")return a.total_time_played-b.total_time_played;
        return 0;
    });
    const tbody=document.getElementById("lb-tbody");
    tbody.innerHTML="";
    sorted.forEach((p,i)=>{
        const tr=document.createElement("tr");
        const isYou=p.username===currentUser;
        tr.className=isYou?"lb-you":"";
        const roleTag=p.role==="owner"?"<span class='owner-badge'>OWNER</span>":p.role==="admin"?"<span class='admin-badge'>ADMIN</span>":"";
        tr.innerHTML=`<td>${i+1}</td><td>${p.username} ${roleTag}</td><td>${p.highest_reached}</td><td>${p.score}</td><td>${p.best_streak}</td>`;
        tbody.appendChild(tr);
    });
}

// ADMIN
async function showAdminPanel(){
    if(!["owner","admin"].includes(userRole))return;
    document.getElementById("admin-role-badge").textContent=`Your role: ${userRole.toUpperCase()}`;
    await loadAdminUsers();
    showScreen("screen-admin");
}

async function loadAdminUsers(){
    const users=await dbGetAllUsers();
    const saves=await dbGetAllSaves();
    const sel=document.getElementById("admin-user-select");
    sel.innerHTML='<option value="">Select player...</option>';
    const tbody=document.getElementById("admin-users-tbody");
    tbody.innerHTML="";
    users.forEach(u=>{
        const s=saves.find(sv=>sv.user_id===u.id)||{};
        const opt=document.createElement("option");
        opt.value=u.username;opt.textContent=`${u.username} (${u.role})`;
        sel.appendChild(opt);
        const tr=document.createElement("tr");
        const roleTag=u.role==="owner"?"<span class='owner-badge'>OWNER</span>":u.role==="admin"?"<span class='admin-badge'>ADMIN</span>":"user";
        tr.innerHTML=`<td>${u.username}</td><td>${roleTag}</td><td>${s.highest_reached||1}</td><td>${s.score||0}</td><td>${s.best_streak||0}</td>`;
        tbody.appendChild(tr);
    });
}

async function adminSetLevel(){
    const u=document.getElementById("admin-user-select").value;
    const v=parseInt(document.getElementById("admin-level-input").value);
    if(!u){alert("Select a player");return;}
    if(isNaN(v)||v<1){alert("Enter valid level");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.current_level=v;s.highest_reached=Math.max(s.highest_reached,v);
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} to level ${v}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminSetScore(){
    const u=document.getElementById("admin-user-select").value;
    const v=parseInt(document.getElementById("admin-score-input").value);
    if(!u){alert("Select a player");return;}
    if(isNaN(v)||v<0){alert("Enter valid score");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.score=v;
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} score to ${v}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminSetStreak(){
    const u=document.getElementById("admin-user-select").value;
    const v=parseInt(document.getElementById("admin-streak-input").value);
    if(!u){alert("Select a player");return;}
    if(isNaN(v)||v<0){alert("Enter valid streak");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.streak=v;s.best_streak=Math.max(s.best_streak,v);
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} streak to ${v}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminGiveAchievement(){
    const u=document.getElementById("admin-user-select").value;
    const k=document.getElementById("admin-achievement-select").value;
    if(!u){alert("Select a player");return;}
    if(!k){alert("Select achievement");return;}
    const unlocked=await dbGetAchievements(u);
    if(!unlocked.includes(k)){
        await dbAddAchievement(u,k);
        const st=document.getElementById("admin-status");st.textContent=`Gave ${ACHIEVEMENTS[k].name} to ${u}`;st.className="admin-status show success";
    }else{
        const st=document.getElementById("admin-status");st.textContent=`${u} already has this achievement`;st.className="admin-status show error";
    }
}

async function adminResetGame(){
    const u=document.getElementById("admin-user-select").value;
    if(!u){alert("Select a player");return;}
    if(!confirm(`Reset game for ${u}?`))return;
    await dbSetSave(u,defaultSave());
    const st=document.getElementById("admin-status");st.textContent=`Reset game for ${u}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminDeleteUser(){
    const u=document.getElementById("admin-user-select").value;
    if(!u){alert("Select a player");return;}
    if(u.toLowerCase()===OWNER_USERNAME){alert("Cannot delete the owner!");return;}
    if(!confirm(`DELETE ${u} permanently?`))return;
    await dbDeleteUser(u);
    const st=document.getElementById("admin-status");st.textContent=`Deleted ${u}`;st.className="admin-status show success";
    await loadAdminUsers();
    document.getElementById("admin-user-select").value="";
    document.getElementById("admin-user-info").textContent="";
    document.getElementById("admin-user-achievements").textContent="Select a player to view";
}

async function adminSetInfiniteLevel(){
    const u=document.getElementById("admin-user-select").value;
    const v=parseInt(document.getElementById("admin-infinite-input").value);
    if(!u){alert("Select a player");return;}
    if(isNaN(v)||v<0){alert("Enter valid level");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.infinite_level=v;
    if(v>0){s.current_level=101+v;s.highest_reached=Math.max(s.highest_reached,101+v);}
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} infinite level to ${v}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminSetTotalCorrect(){
    const u=document.getElementById("admin-user-select").value;
    const v=parseInt(document.getElementById("admin-correct-input").value);
    if(!u){alert("Select a player");return;}
    if(isNaN(v)||v<0){alert("Enter valid number");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.total_correct=v;
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} total correct to ${v}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminToggleTrophy(unlock){
    const u=document.getElementById("admin-user-select").value;
    if(!u){alert("Select a player");return;}
    const s=await dbGetSave(u)||defaultSave();
    s.trophy_unlocked=unlock;
    await dbSetSave(u,s);
    const st=document.getElementById("admin-status");st.textContent=`${unlock?"Unlocked":"Locked"} trophy for ${u}`;st.className="admin-status show success";
    await onAdminUserChange();await loadAdminUsers();
}

async function adminSetRole(){
    const u=document.getElementById("admin-user-select").value;
    const r=document.getElementById("admin-role-select").value;
    if(!u){alert("Select a player");return;}
    if(u.toLowerCase()===OWNER_USERNAME){alert("Cannot change owner role!");return;}
    await dbUpdateUserRole(u,r);
    const st=document.getElementById("admin-status");st.textContent=`Set ${u} role to ${r}`;st.className="admin-status show success";
    await loadAdminUsers();
    if(r==="owner")await ensureOwnerRole();
}

async function adminRemoveAchievements(){
    const u=document.getElementById("admin-user-select").value;
    if(!u){alert("Select a player");return;}
    if(!confirm(`Remove all achievements from ${u}?`))return;
    const {data:user}=await sb.from("users").select("id").eq("username",u).single();
    if(!user)return;
    await sb.from("achievements").delete().eq("user_id",user.id);
    const st=document.getElementById("admin-status");st.textContent=`Removed all achievements from ${u}`;st.className="admin-status show success";
    await onAdminUserChange();
}

async function onAdminUserChange(){
    const u=document.getElementById("admin-user-select").value;
    if(!u){
        document.getElementById("admin-user-info").textContent="";
        document.getElementById("admin-user-achievements").textContent="Select a player to view";
        return;
    }
    const s=await dbGetSave(u)||defaultSave();
    const infLv=s.infinite_level>0?` | Infinite Lv.${s.infinite_level}`:"";
    document.getElementById("admin-user-info").textContent=`Level: ${s.current_level} | Score: ${s.score} | Streak: ${s.streak} | Best Streak: ${s.best_streak} | Correct: ${s.total_correct} | Trophy: ${s.trophy_unlocked?"Yes":"No"}${infLv}`;

    const unlocked=await dbGetAchievements(u);
    const achDiv=document.getElementById("admin-user-achievements");
    if(unlocked.length===0){
        achDiv.textContent="No achievements yet";
    }else{
        achDiv.innerHTML=unlocked.map(k=>{
            const a=ACHIEVEMENTS[k];
            return a?`<span class="admin-ach-tag">${a.icon} ${a.name}</span>`:"";
        }).join(" ");
    }
}

// OWNER ROLE
async function ensureOwnerRole(){
    if(!currentUser||userRole!=="owner")return;
    const user=await dbGetUser(currentUser);
    if(user&&user.role!=="owner"){
        await dbUpdateUserRole(currentUser,"owner");
        userRole="owner";
    }
}

// INIT
(async function(){
    if(!SUPABASE_URL||SUPABASE_URL.includes("YOUR-PROJECT")){
        document.getElementById("auth-error").textContent="Configure supabase-config.js first!";
        return;
    }
    const saved=localStorage.getItem("qc_user");
    if(saved){
        try{
            const user=await dbGetUser(saved);
            if(user){
                currentUser=saved;userRole=user.role||"user";
                document.getElementById("menu-username").textContent=currentUser;
                document.getElementById("btn-admin-menu").classList.toggle("hidden",!["owner","admin"].includes(userRole));
                showScreen("screen-menu");refreshMenuInfo();
            }else{
                localStorage.removeItem("qc_user");
            }
        }catch(e){
            localStorage.removeItem("qc_user");
        }
    }
})();
