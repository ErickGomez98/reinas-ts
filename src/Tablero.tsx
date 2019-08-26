import React from 'react';

const validacion: Function = (arr: Array<number>) => {

};

async function wait(d: Array<number>) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            console.log(d); resolve()
        }, 2000);
    });
}

const xd = async (fn: Function) => {
    const size: number = 6;
    let arr: Array<number>;
    let con = 0;

    for (let i: number = 1; i <= size; i++) {
        for (let j: number = 1; j <= size; j++) {
            for (let k: number = 1; k <= size; k++) {
                for (let l: number = 1; l <= size; l++) {
                    for (let m: number = 1; m <= size; m++) {
                        for (let n: number = 1; n <= size; n++) {
                            arr = [i, j, k, l, m, n];
                            await wait(arr);
                            fn("12")
                        }
                    }
                }
            }
        }
    }
}


const Tablero: React.FC = () => {
    const table: Array<React.ReactElement> = [];
    const Tr = (props: any) => <tr {...props}></tr>;
    const Td = (props: any) => <td {...props}></td>;
    let qwe: string = "";

    xd((a: string) => { qwe = a; console.log(a, qwe) });



    const reinas = [5, 3, 1, 6, 4, 2];

    for (let i: number = 1; i <= 6; i++) {
        const children: Array<React.ReactElement> = [];
        for (let j: number = 1; j <= 6; j++) {
            if (reinas[i - 1] === j) { // reinas[i - 1] porque estoy contando desde 1 y no desde 0 como un array normal
                children.push(<Td key={j} cellid={j} style={{ background: 'red' }} >a</Td>);
            } else {
                children.push(<Td key={j} cellid={j} >a</Td>);
            }
        }
        table.push(<Tr key={i} rowid={i}>{children}</Tr>);
    }

    console.log(qwe);
    return (
        <div className="tablero">
            {qwe}
            <table className="tablero-table">
                <tbody>
                    {table}

                </tbody>
            </table>
        </div>
    );
}

export default Tablero;
