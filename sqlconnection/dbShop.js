import React from 'react';
import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('shoplist.db');

//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //By default, primary key is auto_incremented - we do not add anything to that column
            tx.executeSql('create table if not exists shoplist(id integer not null primary key, name text not null, amount real not null, unit text, checked integer);',
            //second parameters of execution:empty brackets - this parameter is not needed when creating table            
            [],
            //If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const addItem=(name, amount, unit)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into shoplist(name, amount, unit) values(?,?,?);',
            //And the values come here
            [name, amount, unit],
            //If the transaction succeeds, this is called
            (_, result)=>{
                resolve(result);
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchList=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('select * from shoplist;',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const updateListpos=(id, checked)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('Update shoplist set checked=1 WHERE id='+id+';',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};
export const updateListneg=(id, checked)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('Update shoplist set checked=0 WHERE id='+id+';',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const deleteFromList=(id)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('DELETE FROM shoplist WHERE id='+id+';',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};
export const deleteList=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table fish
            tx.executeSql('DELETE FROM shoplist',
            [],
            (tx, result)=>{
                resolve(result);
            },
            (tx,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};