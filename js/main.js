'use strict';

{
  function setWord (){
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];//spliceを使って複数回やっても重複しないよう要素をランダムにwordにセットする。
    target.textContent = word;
    loc = 0;//新しいwordをセットしたらlocをゼロに戻す
  }
  const words = [
    'aiueo',
    'kakikukeko',
    'sasisuseso',
    'tatituteto',
    'naninuneno',
    'hahihuheho',
    'mamimumemo',
    'yayuyo',
    'rarirurero',
    'wawon',
    'gagigugego',
    'zazizuzezo',
    'dadidudedo',
    'babibubebo',
    'jajijujejo',
    'fafifufefo',
  ]

  let word;
  let loc = 0;//何番目に打った文字かを管理する変数、最初は０文字目からなので０で初期化（locはlocationの略）
  let startTime;
  let isPlaying = false;
  const target = document.getElementById('target');
  const hidden = document.getElementById('hidden');

  // document.addEventListener('click', () => {//クリックしたらsetWordが実行され、wordが表示される
  //   if (isPlaying === true) {
      // return;
  document.addEventListener('keydown', event => {//何かキーを押したらsetWordが実行され、wordが表示される
    if (isPlaying === true) {
      return;
    }

      hidden.removeAttribute("id")
      isPlaying = true;
      startTime = Date.now();//クリックした時点での現在時刻をstartTimeで取得
      setWord()  
    })
 
  document.addEventListener('keydown', e => {//documentに対してEventLisnerを追加、keydownでキーが押された時に次の処理をするように命令。eでイベントオブジェクトを取得
    if (isPlaying === false) {
      return;
    }
      const youPush = document.getElementById('youPush');
      // const pushed = document.getElementById('pushed')
      youPush.textContent =  `${e.key}`;

      // e.key.classList.add('e.key')
    if (e.key !== word[loc]) {//押したキーが正しくない場合そこで処理を終わりにする。
      return;
    }//このようにメインとなる処理以外のケースを早めに除外してメインとなる処理をわかりやすくすることを「早期リターン」もしくは「アーリーリターン」と呼ぶ
    
    loc++;
    target.textContent = '_'.repeat(loc) + word.substring(loc);//repeatを使うことでアンダーバーをlocの個数分つなげた文字列を作り、substringでwordのloc番目以降の文字を取り出す。
      if (loc === word.length) {
        if (words.length === 0) {
          const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);//ゲームが開始してから終わるまでの経過時間をelapsedTimeで取得。そのままではミリ秒単位なので、１０００で割り、toFixedで小数点以下２桁を表示
          const container = document.querySelectorAll('div')[2]
          container.remove()
          const result = document.getElementById('result')
          result.textContent = `You finished ${elapsedTime} seconds!`;
          const btn = document.createElement('button');
          btn.textContent = 'もう一度する！';
          const screen = document.getElementById('screen')
          screen.appendChild(btn)
          btn.classList.add('btn')
          btn.addEventListener('click', () => {
            location.reload();
          });
          return;
        }
        setWord();
      }
  });
  

}