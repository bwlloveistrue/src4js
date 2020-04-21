class WindowFunc {
  getTop(current = null) {
    try {
      let topWindow = window.top;
      topWindow.canSet = "canSet";
      if (!topWindow.ecCom) {
        return self;
      }
      return topWindow;
    } catch (error) {
      if (current === null) {
        current = self;
      }
      if (current.setTopWindow) {
        return current.setTopWindow;
      } else {
        try {
          let parentWindow = current.parent;
          parentWindow.canSet = "canSet";
          return this.getTop(parentWindow);
        } catch (error) {
          current.setTopWindow = current;
          return current;
        }
      }
    }
  }
  getParent() {
    try {
      let parent = window.parent;
      if (!parent.ecCom) {
        return self;
      }
      return parent;
    } catch (error) {
      return self;
    }
  }
}

export default new WindowFunc();