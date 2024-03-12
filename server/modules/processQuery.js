module.exports = {
	processQuery: (db, query, args) => {
		return new Promise((resolve, reject) => {
			db.query(query, args, (err, res) => {
				if (err) {
					console.log(err);
					resolve([]);
				} else resolve(res);
			});
		});
	},
};
