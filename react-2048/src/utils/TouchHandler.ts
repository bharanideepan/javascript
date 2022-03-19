class TouchHandler {
  xDown = 0;
  yDown = 0;

  getTouches = (event: any) => {
    return (
      event.touches || // browser API
      event.originalEvent.touches
    ); // jQuery
  };

  handleTouchStart = (event: any) => {
    const firstTouch = this.getTouches(event)[0];
    this.xDown = firstTouch.clientX;
    this.yDown = firstTouch.clientY;
  };

  handleTouchMove(event: any): { key: string } | undefined {
    if (!this.xDown || !this.yDown) {
      return;
    }
    const xUp = event.touches[0].clientX;
    const yUp = event.touches[0].clientY;
    const xDiff = this.xDown - xUp;
    const yDiff = this.yDown - yUp;
    let result;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        result = { key: "ArrowLeft" }
      } else {
        result = { key: "ArrowRight" }
      }
    } else {
      if (yDiff > 0) {
        result = { key: "ArrowUp" }
      } else {
        result = { key: "ArrowDown" }
      }
    }
    /* reset values */
    this.xDown = 0;
    this.yDown = 0;
    return result;
  }
}

const touch = new TouchHandler();
export default touch;