// A $( document ).ready() block.
jQuery( document ).ready(function($) {

    $('.sidebar-none .widget-area').masonry({
	  // options
		  itemSelector: '.widget',
		  columnWidth: '.widget'
	});

});
(function () {
  if (sessionStorage.getItem("noticeClosed")) return;

  const noticeBar = document.createElement("div");
  noticeBar.style.position = "relative";
  noticeBar.style.backgroundColor = "rgb(0, 140, 255)";
  noticeBar.style.color = "#ffffff";
  noticeBar.style.padding = "6px 16px"; // Less padding for thinner bar
  noticeBar.style.fontSize = "14px"; // Smaller font for compactness
  noticeBar.style.textAlign = "center";
  noticeBar.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
  noticeBar.style.zIndex = "9999";
  noticeBar.style.width = "100%";

  const messageWrapper = document.createElement("div");
  messageWrapper.innerHTML = "Buy this aged domain and original website together (2 in 1) — now available at a highly affordable price on <a href='https://age.domains' target='_blank' style='color: inherit; text-decoration: underline;'>age.domains</a>!";
  messageWrapper.style.display = "inline-block";
  messageWrapper.style.maxWidth = "100%";

  noticeBar.appendChild(messageWrapper);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "50%";
  closeBtn.style.right = "10px";
  closeBtn.style.transform = "translateY(-50%)";
  closeBtn.style.background = "none";
  closeBtn.style.border = "none";
  closeBtn.style.fontSize = "18px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.color = "#ffffff";
  closeBtn.onclick = function () {
    noticeBar.remove();
    sessionStorage.setItem("noticeClosed", "true");
  };

  noticeBar.appendChild(closeBtn);

  window.addEventListener("DOMContentLoaded", function () {
    const page = document.getElementById("page");
    if (page) {
      page.style.marginTop = noticeBar.offsetHeight + "px"; // Push content down
      page.parentNode.insertBefore(noticeBar, page);
    } else {
      document.body.prepend(noticeBar);
    }
  });
})();
