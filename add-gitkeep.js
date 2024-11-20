const fs = require("fs");
const path = require("path");

// Функция для проверки папок и добавления .gitkeep
function addGitKeepIfEmpty(dir) {
	fs.readdir(dir, (err, files) => {
		if (err) {
			console.error(`Error reading directory ${dir}:`, err);
			return;
		}

		// Проверка на пустоту папки
		if (files.length === 0) {
			const gitkeepPath = path.join(dir, ".gitkeep");
			fs.writeFile(gitkeepPath, "", (err) => {
				if (err) {
					console.error(`Error creating .gitkeep in ${dir}:`, err);
				} else {
					console.log(`Created .gitkeep in: ${dir}`);
				}
			});
		} else {
			// Удаление .gitkeep, если есть другие файлы
			const gitkeepPath = path.join(dir, ".gitkeep");
			if (files.includes(".gitkeep")) {
				// Удаляем .gitkeep, если есть другие файлы
				const otherFiles = files.filter((file) => file !== ".gitkeep");
				if (otherFiles.length > 0) {
					fs.unlink(gitkeepPath, (err) => {
						if (err) {
							console.error(`Error deleting .gitkeep in ${dir}:`, err);
						} else {
							console.log(`Deleted .gitkeep in: ${dir}`);
						}
					});
				}
			}
		}
	});
}

// Функция для рекурсивного обхода директорий
function checkDirectories(dir) {
	fs.readdir(dir, (err, items) => {
		if (err) {
			console.error(`Error reading directory ${dir}:`, err);
			return;
		}

		items.forEach((item) => {
			const itemPath = path.join(dir, item);
			fs.stat(itemPath, (err, stats) => {
				if (err) {
					console.error(`Error stating ${itemPath}:`, err);
					return;
				}

				if (stats.isDirectory()) {
					// Рекурсивно проверяем подпапки
					checkDirectories(itemPath);
					addGitKeepIfEmpty(itemPath); // Проверяем на пустоту
				}
			});
		});
	});
}

// Запуск функции с указанием пути к корневой директории проекта
const projectPath = path.join(__dirname);
checkDirectories(projectPath);
