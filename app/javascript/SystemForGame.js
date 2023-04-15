//画像のオブジェクト。
//number:画像の連番,answer:答え,path:画像の相対パス,janre:ジャンル
class generatedImg{
    constructor(number, answer, path, janre){
        this.number = Number(number);
        this.answer = answer;
        this.path = path;
        this.janre = janre;
    }
}

//問題に使われる画像オブジェクトを定義
const img01 = new generatedImg(1, '犬も歩けば棒に当たる', 'image/InumoArukebaBouniataru.jpg', 'ことわざ');
const img02 = new generatedImg(2, '一石二鳥', 'image/IssekiNityou.jpg', 'ことわざ');
const img03 = new generatedImg(3, '壁に耳あり障子に目あり', 'image/KabenimimiariSyouzinimeari.jpg', 'ことわざ');
const img04 = new generatedImg(4, '光陰矢の如し', 'image/KouinYanogotoshi.jpg', 'ことわざ');
const img05 = new generatedImg(5, '泣きっ面に蜂', 'image/NakitturaniHachi_2.jpg', 'ことわざ');
const img06 = new generatedImg(6, '猫に小判', 'image/NekoniKoban_2.jpg', 'ことわざ');
const img07 = new generatedImg(7, '猿も木から落ちる', 'image/SarumoKikaraOtiru_2.jpg', 'ことわざ');
const img08 = new generatedImg(8, '時は金なり', 'image/TokihaKanenari.jpg', 'ことわざ');
//リストに格納
const img_list = [img01, img02,img03, img04, img05, img06, img07, img08];
const used_img = [];

//正答数
let score = 0;

//ゲームが始まる前に、カウントダウンをするメソッド
//id_name:カウントダウンを表示するタグのid,count:カウントダウンの数字,timer_valid:タイマーを使うのに必要な変数を格納した配列,game_valid:ゲームのメソッド使うのに必要な変数を格納した配列
function count_down(id_name, count){
    let display = document.getElementById(id_name);
    
    if(count == 0){
        display.innerHTML = "Start!";
    }else{
        display.innerHTML = count;
        count--;
        setTimeout(() => {
            count_down(id_name, count);
        },1000)
    }
}

//ゲームの始まるタイマーをスタートさせるメソッド
//timelimitには、制限時間（秒数）を入れる
//id_name:タイマーを表示するタグのid,timelimit:制限時間
function timer(id_name, timelimit){
    let display = document.getElementById(id_name);
    if(timelimit == 0){
        display.innerHTML = "Stop!";
    }else{
        if((timelimit * 100) % 10 == 0){
            display.innerHTML = timelimit + "0";
        }else if((timelimit * 100) % 100 == 0){
            display.innerHTML = timelimit + "00";
        }else{
            display.innerHTML = timelimit;
        }
        timelimit = Math.floor((timelimit * 100 -1)) / 100;
        setTimeout(() => {
            timer(id_name, timelimit);
        }, 10);
    }
}

//画面に問題文と画像を表示し、ユーザーの操作を処理するメソッド
//input_id:テキストボックスのid,btn_id:送信ボタンのid,skip_btn_id:スキップボタンのid,display_id:画像を表示するタグのid,message_id:正解、不正解のメッセージを表示するid,question_id:問題文を表示するid,score_id:スコアを表示するid
function game_playing(input_id, btn_id, skip_btn_id, display_id, message_id, question_id, score_id){
    //ドキュメントの部品のelementを取得
    let input = document.getElementById(input_id);
    let btn = document.getElementById(btn_id);
    let skip_btn = document.getElementById(skip_btn_id);
    let display = document.getElementById(display_id);
    let message = document.getElementById(message_id);
    let question = document.getElementById(question_id);

    //画像オブジェクトを生成
    let img_obj = img_apperance();

    //画像と問題文を表示
    display.innerHTML = '<img src=' + img_obj.path + ' width=100%/>';
    question.innerHTML = 'この画像が意味する' + img_obj.janre + 'は？';

    //スコアを表示
    document.getElementById(score_id).innerHTML = score;

    //送信ボタンを押したときの処理
    btn.addEventListener('click', () => {
        if(input.value == img_obj.answer){
            message.innerHTML = "正解！"
            score++;
            document.getElementById(score_id).innerHTML = score;
            used_img.push(img_obj);
            game_playing(input_id, btn_id, skip_btn_id, display_id, message_id, question_id, score_id);
        }else{
            message.innerHTML = "ちがいます。"
        }
        input.value = "";
    })

    //エンターキーを押したときの処理
    window.document.onkeydown = function(event){
        if (event.key === 'Enter') {
            if(input.value == img_obj.answer){
                message.innerHTML = "正解！";
                score++;
                document.getElementById(score_id).innerHTML = score;
                used_img.push(img_obj);
                game_playing(input_id, btn_id, skip_btn_id, display_id, message_id, question_id, score_id);
            }else{
                message.innerHTML = "ちがいます。";
            }
            input.value = "";
        }
        
    }

    //スキップボタンを押したときの処理
    skip_btn.addEventListener('click', () => {
        img_obj = img_apperance();
        display.innerHTML = img_obj;
    })

}

//ランダムな数字を元に、画像オブジェクトを返すメソッド。
//used_imgに含まれるものは返さない。
function img_apperance(){
    let img_obj;
    do{
        let random = Math.random();
        let random_num = Math.round((img_list.length - 1) * random);
        img_obj = img_list[random_num];
    }while(used_img.includes(img_obj))
    return img_obj;
}

