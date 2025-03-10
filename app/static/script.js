document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    let snake = [{ x: 9 * box, y: 10 * box }];
    let direction = 'RIGHT';
    let food = {
        x: Math.floor(Math.random() * 19 + 1) * box,
        y: Math.floor(Math.random() * 19 + 1) * box,
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        else if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        else if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
        else if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? 'green' : 'lightgreen';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
            ctx.strokeStyle = 'darkgreen';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        let headX = snake[0].x;
        let headY = snake[0].y;
        if (direction === 'LEFT') headX -= box;
        if (direction === 'UP') headY -= box;
        if (direction === 'RIGHT') headX += box;
        if (direction === 'DOWN') headY += box;

        if (headX === food.x && headY === food.y) {
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box,
            };
        } else {
            snake.pop();
        }

        let newHead = { x: headX, y: headY };
        if (
            headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height ||
            snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
            clearInterval(game);
            alert('Game Over');
            return;
        }

        snake.unshift(newHead);
    }

    let game = setInterval(draw, 100);
});
