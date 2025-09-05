(function () {
  function ImageWithLinkTool(config) {
    this.data = config.data || {};
    this.api = config.api;
  }

  ImageWithLinkTool.prototype.render = function () {
    var wrapper = document.createElement("div");
    wrapper.classList.add("cdx-block");

    var img = document.createElement("img");
    img.src = this.data.url || "";
    img.alt = this.data.caption || "";

    if (this.data.clickableLink) {
      var link = document.createElement("a");
      link.href = this.data.clickableLink;
      link.target = "_blank";
      link.appendChild(img);
      wrapper.appendChild(link);
    } else {
      wrapper.appendChild(img);
    }

    if (this.data.caption) {
      var caption = document.createElement("div");
      caption.innerText = this.data.caption;
      caption.classList.add("cdx-caption");
      wrapper.appendChild(caption);
    }

    return wrapper;
  };

  ImageWithLinkTool.prototype.save = function (blockContent) {
    var img = blockContent.querySelector("img");
    var link = blockContent.querySelector("a");

    return {
      url: img ? img.src : "",
      clickableLink: link ? link.href : "",
      caption: blockContent.querySelector(".cdx-caption")?.innerText || "",
      withBorder: this.data.withBorder || false,
      withBackground: this.data.withBackground || false,
      stretched: this.data.stretched || false
    };
  };

  // Expose globally
  window.ImageWithLinkTool = ImageWithLinkTool;
})();

