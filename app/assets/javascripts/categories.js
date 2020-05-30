$(function(){
  // 子カテゴリ用option作成
  function appendOption(category){
    var html = `<option value="${category.id}">
                  ${category.name}
                </option>`;
    return html;
  }
  // 子カテゴリセレクトボックスhtml作成
  function appendChildrenSelection(insertHtml){
    var childrenSelectHtml = "";
    childrenSelectHtml = `<div class="form-detail__category__input__children">
                            <select class="select-default" id="children_categories" name="item[category]">
                              <option value="">選択して下さい</option>
                              ${insertHtml}
                            </select>
                          </div>`;
    $(".form-detail__category__input").append(childrenSelectHtml);
  }
  // 親カテゴリーセレクトボックスの選択を変えたら、イベント発火
  $("#category_select").on("change", function(){
    // 取得した親カテゴリーのvalueをcategoryに代入
    var parentCategory = document.getElementById("category_select").value;
    // ajaxにて、controllerへ送信
    $.ajax({
      url: "/categories/children_category",
      type: "GET",
      data: {parentCategory: parentCategory},
      dataType: "json",
    })
    .done(function(children){
      var insertHtml = "";
      // 子カテゴリoptionを1つづつ作成
      children.forEach(function(child){
        insertHtml += appendOption(child);
      });
      appendChildrenSelection(insertHtml);
    })
  })
});
