import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoplist.db');

export const init2 = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('create table if not exists shoplist(id integer not null primary key, name text not null, amount real not null, unit text, checked integer);',
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

export const addItem = (name, amount, unit) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('insert into shoplist(name, amount, unit) values(?,?,?);',
                [name, amount, unit],
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




export const fetchList = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('select * from shoplist;',
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

export const updateListpos = (id, checked) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('Update shoplist set checked=1 WHERE id=' + id + ';',
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
export const updateListneg = (id, checked) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('Update shoplist set checked=0 WHERE id=' + id + ';',
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

export const deleteFromList = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM shoplist WHERE id=' + id + ';',
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

export const deleteFromListByName = (name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM shoplist WHERE name="' + name + '";',
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
export const deleteList = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM shoplist',
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