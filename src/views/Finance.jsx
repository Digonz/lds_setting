import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
const Finance = () => {

    const { actions, store } = useContext(Context);

    const [data , setData] = useState();
    const [json , setJson] = useState();
    const [numRegistros, setNumRegistros] = useState(0);
    const [contador , setContador] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [resumen, setResumen] = useState(false);
    const [totalValor, setTotalValor] = useState(0);

    useEffect(() => {
        function getInfo() {
            actions.getPublicJson();
        }
        getInfo();
        setData(store.publicJson.items[0]);
        setJson(store.publicJson.items);
        setNumRegistros(store.publicJson.numRegistros);
        //cantidadInput.current.value = store.publicJson.items[0].cantidad.toString();
        setCargando(false);
        console.log(store.publicJson.items[0], "INFO");
    },[]);

    const onCantidadChange = (e, valor) => {
        console.log(e.target.value, "CHANGE");
        console.log(contador, "pociocion");
        setData({
            ...data,
            cantidad: e.target.value,
        })
        let handleTotal  = valor * e.target.value;
        console.log(handleTotal, "TOTAL");
        let currentJson = json;
        currentJson.forEach((item) => {
            if(item.id === valor) {
                item.cantidad = e.target.value;
                item.total = handleTotal;
            }
        })
        setJson(currentJson);
        console.log(json, "JSON");
        
    }

    const nextStep = (e) => {
        if(contador <= numRegistros-1) {
            setContador(contador + 1 );
            setData(store.publicJson.items[contador+1]);
            console.log(contador, "CONT up");
        }
    };

    const backStep = (e) => {
        if(contador >= 0) {
            setContador(contador - 1 );
            setData(store.publicJson.items[contador-1]);
            console.log(contador, "CONT down");
        }
    }

    const openResumen = (e) => {
        setResumen(!resumen);
        let currentTotal = 0;
        json.forEach((item)=> {
            currentTotal = currentTotal+item.total;
        })
        setTotalValor(currentTotal);
    }





    return (
      <>
        <div className="container text-center">
          <h1 className="mt-5">Finanzas</h1>
        </div>
        {!resumen ? (
          <div className="container d-flex align-items-center main">
            <div className="mx-auto col-11 col-md-9 col-lg-8 p-5 block">
              {cargando ? (
                <h1>... cargando</h1>
              ) : (
                <>
                  <h2 className="text-center mt-3 mb-5">{data.titulo}</h2>
                  <div className="col-8 mx-auto form-floating mb-3 mt-5 ">
                    <input
                      type="number"
                      value={data.cantidad}
                      className="form-control input-conf"
                      placeholder="Ingresa cantidad"
                      onChange={(e) => onCantidadChange(e, data.id)}
                    />
                    <label>Ingresar cantidad</label>
                  </div>
                  <div className="row mt-5 pt-5">
                    <div className="col-6 text-start">
                      {data.btnBack !== "" ? (
                        <button
                          className="btn btn-secondary px-3"
                          onClick={(e) => backStep(e)}
                        >
                          {data.btnBack}
                        </button>
                      ) : null}
                    </div>
                    <div className="col-6 text-end">
                      {data.btnNext !== "Finalizar" ? (
                        <button
                          className="btn btn-success px-3"
                          onClick={(e) => nextStep(e)}
                        >
                          {data.btnNext}
                        </button>
                      ) : (
                        <button
                          className="btn btn-success px-3"
                          onClick={(e) => openResumen(e)}
                        >
                          {data.btnNext}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="container d-flex align-items-center main">
            <div className="mx-auto col-11 col-md-9 col-lg-8 p-5 block-resumen">
              {cargando ? (
                <h1>... cargando</h1>
              ) : (
                <>
                  <h2 className="text-center">Resumen</h2>
                  <table className="container text-center col-6">
                    <tbody>
                        {json.map((item, index) => {
                            return (
                                <>
                            <tr key={index}>
                                <td className="text-start"><h6>${item.id} ({item.cantidad === ''? 0 : item.cantidad})</h6></td>
                                <td className="text-end"><h6>${item.total}</h6></td>
                            </tr>
                            </>
                        );
                        })}
                        <tr>
                            <td className="text-start pt-3"><h3>TOTAL</h3></td>
                            <td className="text-end pt-3"><h3>${totalValor}</h3></td>
                        </tr>
                    </tbody>
                  </table>
                  <div className="row mt-3">
                    <div className="col-6 text-start">
                      {data.btnBack !== "" ? (
                        <button
                          className="btn btn-secondary px-3"
                          onClick={(e) => openResumen(e)}
                        >
                          {data.btnBack}
                        </button>
                      ) : null}
                    </div>
                    <div className="col-6 text-end"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
};
export default Finance;