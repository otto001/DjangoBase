
function areYouSureInit()
{
    var modal = '<div id="modal-are-you-sure" class="modal">  <div class="modal-content">    <h4 class="mdc-typography--display1" id="modal-are-you-sure-title"></h4>          <h5 class="mdc-typography--subheading2" id="modal-are-you-sure-body"></h5>  </div>  <div class="modal-footer">    <a href="#!" class="modal-action modal-close waves-effect btn-flat">Abbrechen</a>    <a href="#!" class="modal-action modal-close waves-effect btn-flat" id="modal-are-you-sure-yes" onclick="areYouSureCallback();">Hinzufügen</a>  </div></div>';
    var modal_obj = document.createElement("div");
    modal_obj.innerHTML = modal;
    document.body.appendChild(modal_obj);
}

function areYouSureCallback()
{
    $("#modal-are-you-sure").removeClass("hide").modal("close");
    document.areYouSureCallbackData();
    document.areYouSureCallbackData = null;
}

function areYouSure(title, body, opt, callback)
{
    $("#modal-are-you-sure").modal("open");
    $("#modal-are-you-sure-title").html(title);
    $("#modal-are-you-sure-body").html(body);
    $("#modal-are-you-sure-yes").text(opt);
    document.areYouSureCallbackData = callback;
}
areYouSureInit();
