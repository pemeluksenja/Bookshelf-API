const {
	placeBookinBookshelf,
	showAllBooksinBookshelf,
	showBookById,
	editBookById,
	deleteBookById,
} = require("./handlers");

const routes = [
	{
		method: "POST",
		path: "/books",
		handler: placeBookinBookshelf,
	},
	{
		method: "GET",
		path: "/books",
		handler: showAllBooksinBookshelf,
	},
	{
		method: "GET",
		path: "/books/{bookId}",
		handler: showBookById,
	},
	{
		method: "PUT",
		path: "/books/{bookId}",
		handler: editBookById,
	},
	{
		method: "DELETE",
		path: "/books/{bookId}",
		handler: deleteBookById,
	},
];

module.exports = routes;
