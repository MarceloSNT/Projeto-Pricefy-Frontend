(function () {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node.tagName === "SCRIPT" &&
          (node.src?.includes("content_reporter") ||
            node.src?.includes("webpage_content"))
        ) {
          node.remove();
          console.log("🛡️ Bloqueada extensão");
        }
      });
    });
  });
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  document
    .querySelectorAll('script[src*="content_reporter"]')
    .forEach((s) => s.remove());
})();
