import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('foodworld.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('create table if not exists favorite(id integer not null primary key, recipeID integer not null);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const addFavorite = (recipeID) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('insert into favorite(recipeID) values(?);',
                [recipeID],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchAllFavorite = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('select * from favorite;',
                [],
                (tx, result) => {
                    resolve(result);
                },
                (tx, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};


export const deleteFavorite = (recipeID) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('delete from favorite where recipeID = ?;',
                [recipeID],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};