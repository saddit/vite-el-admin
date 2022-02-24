export default class Lock {
  isLock: boolean
  lockList: { resolve: (func: Function) => void, reject: () => void }[]

  constructor() {
    this.isLock = false;
    this.lockList = [];
  }

  async getLock(): Promise<Function> {
    let _this = this;
    function unlock() {
      let waitFunc = _this.lockList.shift();
      if (waitFunc) {
        //reslove promise, release promise resource 
        //and use 'unlock' function as a result, 
        //so next waiting thread can get this lock
        waitFunc.resolve(unlock);
      } else {
        _this.isLock = false;
      }
    }
    if (this.isLock) {
      //create a forever pending promise
      return new Promise((resolve, reject) => {
        this.lockList.push({ resolve, reject });
      });
    } else {
      this.isLock = true;
      return unlock;
    }
  }
}