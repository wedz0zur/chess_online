class Piece {
  constructor(color, position, type) {
    this.color = color;
    this.position = position;
    this.type = type;
  }

  getPossibleMoves(board) {
    throw new Error("Method must be implemented");
  }

  getSymbol() {
    const symbols = {
      pawn: { white: "♙", black: "♟" },
      rook: { white: "♖", black: "♜" },
      knight: { white: "♘", black: "♞" },
      bishop: { white: "♗", black: "♝" },
      queen: { white: "♕", black: "♛" },
      king: { white: "♔", black: "♚" },
    };
    return symbols[this.type][this.color];
  }

  isValidPosition(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
}

class Pawn extends Piece {
  constructor(color, position) {
    super(color, position, "pawn");
  }

  getPossibleMoves(board) {
    const moves = [];
    const direction = this.color === "white" ? -1 : 1;
    const newY = this.position.y + direction;
    const startY = this.color === "white" ? 6 : 1;

    if (
      this.isValidPosition(this.position.x, newY) &&
      !board[newY][this.position.x]
    ) {
      moves.push({ x: this.position.x, y: newY });
    }

    if (this.position.y === startY && !board[newY][this.position.x]) {
      const doubleY = this.position.y + 2 * direction;
      if (!board[doubleY][this.position.x]) {
        moves.push({ x: this.position.x, y: doubleY });
      }
    }

    const attackLeft = { x: this.position.x - 1, y: newY };
    const attackRight = { x: this.position.x + 1, y: newY };
    if (
      this.isValidPosition(attackLeft.x, attackLeft.y) &&
      board[attackLeft.y][attackLeft.x] &&
      board[attackLeft.y][attackLeft.x].color !== this.color
    ) {
      moves.push(attackLeft);
    }
    if (
      this.isValidPosition(attackRight.x, attackRight.y) &&
      board[attackRight.y][attackRight.x] &&
      board[attackRight.y][attackRight.x].color !== this.color
    ) {
      moves.push(attackRight);
    }

    return moves;
  }
}

class Rook extends Piece {
  constructor(color, position) {
    super(color, position, "rook");
  }

  getPossibleMoves(board) {
    const moves = [];
    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
    ];

    directions.forEach((dir) => {
      let x = this.position.x + dir.dx;
      let y = this.position.y + dir.dy;
      while (this.isValidPosition(x, y)) {
        if (!board[y][x]) {
          moves.push({ x, y });
        } else {
          if (board[y][x].color !== this.color) moves.push({ x, y });
          break;
        }
        x += dir.dx;
        y += dir.dy;
      }
    });

    return moves;
  }
}

class Knight extends Piece {
  constructor(color, position) {
    super(color, position, "knight");
  }

  getPossibleMoves(board) {
    const moves = [];
    const knightMoves = [
      { dx: 2, dy: 1 },
      { dx: 2, dy: -1 },
      { dx: -2, dy: 1 },
      { dx: -2, dy: -1 },
      { dx: 1, dy: 2 },
      { dx: 1, dy: -2 },
      { dx: -1, dy: 2 },
      { dx: -1, dy: -2 },
    ];

    knightMoves.forEach((move) => {
      const x = this.position.x + move.dx;
      const y = this.position.y + move.dy;
      if (
        this.isValidPosition(x, y) &&
        (!board[y][x] || board[y][x].color !== this.color)
      ) {
        moves.push({ x, y });
      }
    });

    return moves;
  }
}

class Bishop extends Piece {
  constructor(color, position) {
    super(color, position, "bishop");
  }

  getPossibleMoves(board) {
    const moves = [];
    const directions = [
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ];

    directions.forEach((dir) => {
      let x = this.position.x + dir.dx;
      let y = this.position.y + dir.dy;
      while (this.isValidPosition(x, y)) {
        if (!board[y][x]) {
          moves.push({ x, y });
        } else {
          if (board[y][x].color !== this.color) moves.push({ x, y });
          break;
        }
        x += dir.dx;
        y += dir.dy;
      }
    });

    return moves;
  }
}

class Queen extends Piece {
  constructor(color, position) {
    super(color, position, "queen");
  }

  getPossibleMoves(board) {
    const moves = [];
    const directions = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ];

    directions.forEach((dir) => {
      let x = this.position.x + dir.dx;
      let y = this.position.y + dir.dy;
      while (this.isValidPosition(x, y)) {
        if (!board[y][x]) {
          moves.push({ x, y });
        } else {
          if (board[y][x].color !== this.color) moves.push({ x, y });
          break;
        }
        x += dir.dx;
        y += dir.dy;
      }
    });

    return moves;
  }
}

class King extends Piece {
  constructor(color, position) {
    super(color, position, "king");
  }

  getPossibleMoves(board) {
    const moves = [];
    const kingMoves = [
      { dx: 0, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: -1, dy: 1 },
      { dx: -1, dy: -1 },
    ];

    kingMoves.forEach((move) => {
      const x = this.position.x + move.dx;
      const y = this.position.y + move.dy;
      if (
        this.isValidPosition(x, y) &&
        (!board[y][x] || board[y][x].color !== this.color)
      ) {
        moves.push({ x, y });
      }
    });

    return moves;
  }
}

class Board {
  constructor() {
    this.grid = this.initializeBoard();
    this.capturedPieces = { white: [], black: [] };
  }

  initializeBoard() {
    const grid = Array(8)
      .fill()
      .map(() => Array(8).fill(null));

    for (let i = 0; i < 8; i++) {
      grid[1][i] = new Pawn("black", { x: i, y: 1 });
      grid[6][i] = new Pawn("white", { x: i, y: 6 });
    }

    grid[0][0] = new Rook("black", { x: 0, y: 0 });
    grid[0][7] = new Rook("black", { x: 7, y: 0 });
    grid[7][0] = new Rook("white", { x: 0, y: 7 });
    grid[7][7] = new Rook("white", { x: 7, y: 7 });

    grid[0][1] = new Knight("black", { x: 1, y: 0 });
    grid[0][6] = new Knight("black", { x: 6, y: 0 });
    grid[7][1] = new Knight("white", { x: 1, y: 7 });
    grid[7][6] = new Knight("white", { x: 6, y: 7 });

    grid[0][2] = new Bishop("black", { x: 2, y: 0 });
    grid[0][5] = new Bishop("black", { x: 5, y: 0 });
    grid[7][2] = new Bishop("white", { x: 2, y: 7 });
    grid[7][5] = new Bishop("white", { x: 5, y: 7 });

    grid[0][3] = new Queen("black", { x: 3, y: 0 });
    grid[7][3] = new Queen("white", { x: 3, y: 7 });

    grid[0][4] = new King("black", { x: 4, y: 0 });
    grid[7][4] = new King("white", { x: 4, y: 7 });

    return grid;
  }

  render() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const cell = document.createElement("div");
        cell.className = `chess-board__cell chess-board__cell--${
          (x + y) % 2 === 0 ? "white" : "black"
        }`;
        cell.dataset.x = x;
        cell.dataset.y = y;

        const piece = this.grid[y][x];
        if (piece) {
          const pieceDiv = document.createElement("div");
          pieceDiv.className = "chess-board__piece";
          pieceDiv.textContent = piece.getSymbol();
          pieceDiv.draggable = true;
          pieceDiv.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("position", JSON.stringify(piece.position));
            this.showPossibleMoves(piece);
          });
          pieceDiv.addEventListener("dragend", () => this.clearPossibleMoves());
          cell.appendChild(pieceDiv);
        }

        cell.addEventListener("dragover", (e) => e.preventDefault());
        cell.addEventListener("drop", (e) => game.handleDrop(e, { x, y }));
        boardDiv.appendChild(cell);
      }
    }
    this.renderLabels();
    this.renderCapturedPieces();
  }

  movePiece(from, to, promoteTo = null) {
    const capturedPiece = this.grid[to.y][to.x];
    if (capturedPiece) {
      this.capturedPieces[capturedPiece.color === "white" ? "black" : "white"].push(
        capturedPiece
      );
      if (capturedPiece.type === "king") {
        game.handleGameOver(capturedPiece.color === "white" ? "black" : "white");
      }
    }

    const piece = this.grid[from.y][from.x];
    this.grid[to.y][to.x] = promoteTo || this.grid[from.y][from.x];
    this.grid[to.y][to.x].position = { x: to.x, y: to.y };
    this.grid[from.y][from.x] = null;

    if (
      piece.type === "pawn" &&
      ((piece.color === "white" && to.y === 0) ||
       (piece.color === "black" && to.y === 7)) &&
      !promoteTo
    ) {
      this.promotePawn(piece.color, to);
      return false; // Ход не завершен, ждем превращения
    }

    this.render();
    return true; // Ход завершен
  }

  promotePawn(color, position) {
    const modal = document.getElementById("promotion-modal");
    const piecesDiv = document.getElementById("promotion-pieces");
    piecesDiv.innerHTML = "";

    const availablePieces = ["queen", "rook", "bishop", "knight"];
    availablePieces.forEach((type) => {
      const piece = new (eval(type.charAt(0).toUpperCase() + type.slice(1)))(
        color,
        position
      );
      const pieceDiv = document.createElement("span");
      pieceDiv.className = "promotion-modal__piece";
      pieceDiv.textContent = piece.getSymbol();
      pieceDiv.addEventListener("click", () => {
        this.grid[position.y][position.x] = new (eval(type.charAt(0).toUpperCase() + type.slice(1)))(
          color,
          position
        );
        this.render();
        modal.classList.remove("modal--visible");
        game.completeMove();
      });
      piecesDiv.appendChild(pieceDiv);
    });

    modal.classList.add("modal--visible");
  }

  showPossibleMoves(piece) {
    const moves = piece.getPossibleMoves(this.grid);
    moves.forEach((move) => {
      const cell = document.querySelector(
        `[data-x="${move.x}"][data-y="${move.y}"]`
      );
      if (cell) cell.classList.add("chess-board__cell--possible");
    });
  }

  clearPossibleMoves() {
    document
      .querySelectorAll(".chess-board__cell--possible")
      .forEach((cell) => {
        cell.classList.remove("chess-board__cell--possible");
      });
  }

  renderLabels() {
    const rowsDiv = document.querySelector(".chess-board__labels--rows");
    const colsDiv = document.querySelector(".chess-board__labels--cols");
    rowsDiv.innerHTML = "";
    colsDiv.innerHTML = "";
    for (let i = 0; i < 8; i++) {
      const rowLabel = document.createElement("span");
      rowLabel.textContent = 8 - i;
      rowsDiv.appendChild(rowLabel);
      const colLabel = document.createElement("span");
      colLabel.textContent = String.fromCharCode(97 + i);
      colsDiv.appendChild(colLabel);
    }
  }

  renderCapturedPieces() {
    const whiteCapturedDiv = document.getElementById("white-captured");
    const blackCapturedDiv = document.getElementById("black-captured");
    whiteCapturedDiv.innerHTML = "";
    blackCapturedDiv.innerHTML = "";

    this.capturedPieces.white.forEach((piece) => {
      const pieceDiv = document.createElement("span");
      pieceDiv.className = "captured-pieces__piece";
      pieceDiv.textContent = piece.getSymbol();
      whiteCapturedDiv.appendChild(pieceDiv);
    });

    this.capturedPieces.black.forEach((piece) => {
      const pieceDiv = document.createElement("span");
      pieceDiv.className = "captured-pieces__piece";
      pieceDiv.textContent = piece.getSymbol();
      blackCapturedDiv.appendChild(pieceDiv);
    });
  }
}

class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = "white";
    this.pendingMove = null;
  }

  handleDrop(e, to) {
    const from = JSON.parse(e.dataTransfer.getData("position"));
    const piece = this.board.grid[from.y][from.x];

    if (piece.color !== this.currentPlayer) return;

    const possibleMoves = piece.getPossibleMoves(this.board.grid);
    const isValidMove = possibleMoves.some(
      (move) => move.x === to.x && move.y === to.y
    );

    if (isValidMove) {
      this.pendingMove = { from, to };
      const moveCompleted = this.board.movePiece(from, to);
      if (moveCompleted) {
        this.completeMove();
      }
    }
  }

  completeMove() {
    this.currentPlayer = this.currentPlayer === "white" ? "black" : "white";
    document.getElementById("current-player").textContent = this.currentPlayer;
    this.pendingMove = null;
  }

  handleGameOver(winner) {
    const modal = document.getElementById("game-over-modal");
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = `Победили ${winner === "white" ? "белые" : "черные"}!`;
    modal.classList.add("modal--visible");

    document.getElementById("new-game").addEventListener("click", () => {
      this.board = new Board();
      this.currentPlayer = "white";
      document.getElementById("current-player").textContent = "white";
      this.board.render();
      modal.classList.remove("modal--visible");
    });
  }

  start() {
    this.board.render();
  }
}

const game = new Game();
game.start();