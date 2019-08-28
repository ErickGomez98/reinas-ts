import React from 'react';

const validacion: Function = (arr: Array<number>): boolean => {
    let err: boolean = false;

    // Validar que ninguno se repita en la misma columna
    for (let i: number = 0; i < arr.length; i++) {
        if (!err) {
            for (let j: number = i + 1; j < arr.length; j++) {
                if (arr[i] === arr[j]) {
                    err = true;
                    break;
                }
            }
        }
        else {
            break;
        }
    }


    if (err) {
        return false;
    }

    // Validar en diagonales
    for (let i: number = 0; i < arr.length - 1; i++) {
        if (!err) {
            for (let j: number = 0; j < arr.length - 1 - i; j++) {
                if (arr[i] - j - 1 === arr[i + j + 1] || arr[i] + 1 + j === arr[i + j + 1]) {
                    err = true;
                    break;
                }
            }
        }
        else {
            break;
        }
    }

    if (err) {
        return false;
    }

    return true;
};

interface Step {
    arr: Array<number>,
    isSolution: boolean,
    used: boolean
}

const generateData = (): Array<Step> => {
    const size: number = 6;
    let arr: Array<number>;
    let data: Array<Step> = [];
    for (let i: number = 1; i <= size; i++) {
        for (let j: number = 1; j <= size; j++) {
            for (let k: number = 1; k <= size; k++) {
                for (let l: number = 1; l <= size; l++) {
                    for (let m: number = 1; m <= size; m++) {
                        for (let n: number = 1; n <= size; n++) {
                            arr = [i, j, k, l, m, n];
                            let rtrnStep: Step = {
                                arr: arr,
                                isSolution: validacion(arr),
                                used: false
                            };
                            data.push(rtrnStep);
                        }
                    }
                }
            }
        }
    }
    return data;
}

const Tr = (props: any) => <tr {...props}></tr>;
const Td = (props: any) => <td {...props}></td>;

type MyProps = {

}

type MyState = {
    data: Array<Step>,
    counter: number,
    currentData: Step,
    interval: any,
    finished: boolean,
    isStopped: boolean,
    started: boolean,
    solutions: Array<Step>

}

class Tablero extends React.Component<MyProps, MyState> {
    state: MyState = {
        data: generateData(),
        counter: 0,
        currentData: { arr: [], isSolution: false, used: false },
        interval: false,
        finished: false,
        isStopped: false,
        started: false,
        solutions: []
    }

    continueInterval = () => {
        this.setState({ interval: false, started: true, isStopped: false }, () => {
            this.setState({
                interval: setInterval(() => {
                    this.setState((s) => {
                        return {
                            currentData: s.data[s.counter],
                            counter: s.counter + 1
                        }
                    })
                }, 1)
            })
        })
    };

    stopInterval = () => {
        window.clearInterval(this.state.interval);
        this.setState((state) => {
            const tmp = { ...state.currentData };
            tmp.used = true;
            return {
                interval: false,
                currentData: tmp,
                isStopped: true,
                solutions: [...state.solutions, state.currentData]
            }

        });
    };

    componentDidMount() {
        this.setState((state) => {
            return {
                currentData: state.data[state.counter],
                counter: state.counter + 1
            }
        }
        )
    }

    shouldComponentUpdate(props: any, nextState: any): boolean {
        if (nextState.counter === nextState.data.length) {
            window.clearInterval(this.state.interval);
            this.setState({
                finished: true,
                counter: 0,
                isStopped: true
            })
            return false;
        }
        return true;
    }

    resetAll = () => {
        window.location.reload();
    }

    render() {
        const table: Array<React.ReactElement> = [];
        const reinas = this.state.currentData.arr;
        const { isStopped, started, solutions } = this.state;

        if (this.state.currentData.isSolution && !this.state.currentData.used && !this.state.finished) {
            if (this.state.interval) {
                this.stopInterval();

            }
        }

        for (let i: number = 1; i <= 6; i++) {
            const children: Array<React.ReactElement> = [];
            for (let j: number = 1; j <= 6; j++) {
                if (reinas[i - 1] === j) { // reinas[i - 1] porque estoy contando desde 1 y no desde 0 como un array normal
                    children.push(<Td key={j} cellid={j} className="has-reina" ></Td>);
                } else {
                    children.push(<Td key={j} cellid={j} ></Td>);
                }
            }
            table.push(<Tr key={i} rowid={i}>{children}</Tr>);
        }
        return (
            <div className="tablero">
                <div>
                    <table className="tablero-table">
                        <tbody>
                            {table}
                        </tbody>
                    </table>
                </div>

                <div className="tablero-controls">
                    {!started && <button className="btn" onClick={this.continueInterval}>Iniciar</button>}
                    <button className="btn" onClick={this.continueInterval} disabled={!isStopped}>Continuar</button>
                    <button className="btn" onClick={this.resetAll}>Reiniciar</button>
                    <div>
                        {solutions.map((item, index) => {
                            return <p key={index} >Solución {index + 1}: [ {item.arr.toString()} ]</p>;
                        })}
                    </div>
                </div>
            </div>
        );

    }
}

export default Tablero;
