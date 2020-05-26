// 画像読み込みの必要がないので"load"イベントじゃなく"DOMContentLoaded"
window.addEventListener('DOMContentLoaded', function(){

  //id名が"payment_card_submit-button"というボタンが押されたらノードを取得
  // "document"は開いているWebページのDOMツリーが入っているオブジェクト
  let submit = document.getElementById("payment_card_submit-button");
  // payjpの公開鍵をセット
  Payjp.setPublicKey('pk_test_1505a12ddfdefed5da5d58ab');
  //ボタンが押されたらトークン作成開始。
  submit.addEventListener('click', function(e){ 
    //ボタンを1度無効化
    e.preventDefault(); 
    //入力されたカード情報を取得(id名の記載ミスに注意！)
    let card = { 
        number: document.getElementById("payment_card_no").value, //valueプロパティで文字列の値を取得
        cvc: document.getElementById("payment_card_cvc").value,
        exp_month: document.getElementById("payment_card_month").value,
        exp_year: document.getElementById("payment_card_year").value
    };
    
    // トークンを生成
    Payjp.createToken(card, function(status, response) {  
      if (status === 200) { //成功した場合(status === 200はリクエストが成功している状況です。)
        //データを自サーバにpostしないようにremoveAttr("name")で削除
        $(".number").removeAttr("name");
        $(".cvc").removeAttr("name");
        $(".exp_month").removeAttr("name");
        $(".exp_year").removeAttr("name"); 
        var token = response.id;
        $("#charge-form").append($('<input type="hidden" name="payjp_token" class="payjp-token" />').val(token));
        $("#charge-form").get(0).submit();
      } else {
        alert("カード情報が正しくありません。"); //エラー確認用
      }
    });
  });
});