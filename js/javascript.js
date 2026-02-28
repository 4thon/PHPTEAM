$(function () {
  const $body = $("body");
  const $splash = $("#splash-screen");
  const $hero = $(".hero");
  const $cards = $(".card.reveal");

  $body.addClass("splash-active");

  function startMainAnimations() {
    $hero.animate({ opacity: 1 }, 420).css("transform", "translateY(0)");

    $cards.each(function (index) {
      const $card = $(this);
      const $details = $card.find(".details");
      const $button = $card.find(".toggle-btn");
      const isStatic = $card.hasClass("static-details");

      $card.delay(140 + index * 170).animate({ opacity: 1 }, 520);

      if (isStatic || $button.length === 0) {
        $details.show();
        return;
      }

      $details.hide();

      $button.on("click", function () {
        const isOpen = $details.is(":visible");

        $details.stop(true, true).slideToggle(260);
        $(this)
          .text(isOpen ? "Show Details" : "Hide Details")
          .attr("aria-expanded", String(!isOpen));
      });
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      return;
    }

    $cards.on("mousemove", function (event) {
      const card = this;
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((event.clientX - centerX) / rect.width) * 8;
      const rotateX = ((centerY - event.clientY) / rect.height) * 6;

      card.style.transform = "rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
    });

    $cards.on("mouseleave blur", function () {
      this.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  }

  setTimeout(function () {
    $splash.fadeOut(650, function () {
      $body.removeClass("splash-active");
      startMainAnimations();
    });
  }, 1700);
});
