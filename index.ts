class Machine {
  private MEMORY_SIZE: number = 30000;

  private memory: number[] = new Array(this.MEMORY_SIZE).fill(0);

  private _pointer: number = 0;

  private get pointer() {
    return this._pointer;
  }

  private set pointer(value: number) {
    if (value < 0 || value > this.MEMORY_SIZE) {
      throw new Error("Out of memory");
    }

    this._pointer = value;
  }

  private moveRight() {
    this.pointer += 1;
  }

  private moveLeft() {
    this.pointer -= 1;
  }

  private get value() {
    return this.memory[this.pointer];
  }

  private set value(value: number) {
    this.memory[this.pointer] = value;
  }

  private increaseValue() {
    this.value += 1;
  }

  private decreaseValue() {
    this.value -= 1;
  }

  public execute(code: string) {
    const bracers: number[] = [];
    const output: string[] = [];

    for (let i = 0; i < code.length; i++) {
      const char = code[i];

      switch (char) {
        case ">":
          this.moveRight();
          break;
        case "<":
          this.moveLeft();
          break;
        case "+":
          this.increaseValue();
          break;
        case "-":
          this.decreaseValue();
          break;
        case ".":
          const s = String.fromCharCode(this.value);
          output.push(s);
          break;
        case "[":
          bracers.push(i);
          break;
        case "]":
          if (this.value === 0) {
            bracers.pop();
          } else {
            i = bracers[bracers.length - 1];
          }

          break;
        default:
          break;
      }
    }

    if (output.length) {
      console.log(output.join(""));
    }
  }
}

const machine = new Machine();

const code = ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.>>>++++++++[<++++>-]<.>>>++++++++++[<+++++++++>-]<---.<<<<.+++.------.--------.>>+.>++++++++++.";
machine.execute(code);