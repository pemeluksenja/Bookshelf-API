const { nanoid } = require("nanoid");
const books = require("./books");

const placeBookinBookshelf = (req, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = req.payload;

	const id = nanoid(17);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	if (name === undefined || name === null) {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	if (readPage === pageCount) {
		finished = true;
	} else {
		finished = false;
	}

	const bukuBaru = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	books.push(bukuBaru);
	const cekSukses = books.filter((buku) => buku.id === id).length > 0;
	if (cekSukses) {
		const response = h.response({
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	} else {
		const response = h.response({
			status: "error",
			message: "Catatan gagal ditambahkan",
		});
		response.code(500);
		return response;
	}
};

const showAllBooksinBookshelf = (req, h) => {
	const idBuku = books.map((book) => {
		return book.id;
	});

	const nameBuku = books.map((book) => {
		return book.name;
	});
	const publisherBuku = books.map((book) => {
		return book.publisher;
	});
	if (books.length !== 0) {
		const response = h.response({
			status: "success",
			data: {
				books: [
					{
						id: idBuku[0].toString(),
						name: nameBuku[0].toString(),
						publisher: publisherBuku[0].toString(),
					},
				],
			},
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: "success",
		data: {
			books: [],
		},
	});
	response.code(200);
	return response;
};

const showBookById = (req, h) => {
	const { bookId } = req.params;
	const book = books.filter((book) => book.id === bookId)[0];

	if (book !== undefined) {
		const response = h.response({
			status: "success",
			data: {
				book,
			},
		});
		response.code(200);
		return response;
	} else {
		const response = h.response({
			status: "fail",
			message: "Buku tidak ditemukan",
		});
		response.code(404);
		return response;
	}
};

const editBookById = (req, h) => {
	const { bookId } = req.params;
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = req.payload;
	const updatedAt = new Date().toISOString();
	if (name === undefined || name === null) {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}
	const indeks = books.findIndex((book) => book.id === bookId);

	if (indeks !== -1) {
		books[indeks] = {
			...books[indeks],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt,
		};
		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbarui",
		});
		response.code(200);
		return response;
	} else {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Id tidak ditemukan",
		});
		response.code(404);
		return response;
	}
};

const deleteBookById = (req, h) => {
	const { bookId } = req.params;

	const indeks = books.findIndex((book) => book.id === bookId);

	if (indeks !== -1) {
		books.splice(indeks, 1);
		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus",
		});
		response.code(200);
		return response;
	} else {
		const response = h.response({
			status: "fail",
			message: "Buku gagal dihapus. Id tidak ditemukan",
		});
		response.code(404);
		return response;
	}
};

module.exports = {
	placeBookinBookshelf,
	showAllBooksinBookshelf,
	showBookById,
	editBookById,
	deleteBookById,
};
