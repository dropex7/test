import api from './API.js';

/**
 * Создает новый репозиторий.
 * @param {object} repoData - Данные репозитория (name, description, private).
 * @returns {Promise} - Результат запроса.
 */
export const createRepo = async (repoData) => {
  return api.post('https://api.github.com/user/repos', repoData);
};

/**
 * Обновляет существующий репозиторий.
 * @param {string} username - Логин пользователя.
 * @param {string} repoName - Название репозитория.
 * @param {object} repoData - Данные для обновления (description, private).
 * @returns {Promise} - Результат запроса.
 */
export const updateRepo = async (username, repoName, repoData) => {
  return api.patch(
    `https://api.github.com/repos/${username}/${repoName}`,
    repoData
  );
};

/**
 * Удаляет репозиторий.
 * @param {string} username - Логин пользователя.
 * @param {string} repoName - Название репозитория.
 * @returns {Promise} - Результат запроса.
 */
export const deleteRepo = async (username, repoName) => {
  return api.delete(`https://api.github.com/repos/${username}/${repoName}`);
};
