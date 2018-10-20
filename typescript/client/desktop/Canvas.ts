class Canvas {
    public Ctx: CanvasRenderingContext2D | null;
    public Height: number = window.innerHeight;
    public Width: number = window.innerWidth;

    private canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById('mainScreen');
        this.canvas.width = this.Width;
        this.canvas.height = this.Height;
        this.Ctx = this.canvas.getContext("2d");
    }

    public Clear(): void {
        if (this.Ctx == null) return
        this.Ctx.clearRect(0, 0, this.Width, this.Height)
    }
}

export { Canvas }