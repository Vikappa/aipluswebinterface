import { useDispatch, useSelector } from "react-redux";
import { setNewItemCaricoType, setDeperibileName, setFlavour, setQuantita, setUm } from "../../../redux/reducers/newItemCaricoReducer";
import { useEffect } from "react";

const RowDeperibileCarico = function() {

    const localItem = useSelector(state => state.newItemCarico.newItem);
    const whareHouse = useSelector(state => state.wharehouse);
    const flavours = useSelector(state => state.flavours.flavours);
    const dispatch = useDispatch();

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeDeperibile = (e) => {
        const selectedFood = e.target.value;
        dispatch(setDeperibileName(selectedFood));

        const foodItem = whareHouse.foodShortLine.find(food => food.name === selectedFood);
        if (foodItem) {
            dispatch(setUm(foodItem.um));
        }
    }

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeUm = (e) => {
        dispatch(setUm(e.target.value));
    }

    const handleChangeFlavour = (e) => {
        dispatch(setFlavour(e.target.value));
    }

    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="shortlinesextra" className="form-control me-2" value={localItem.deperibileName} onChange={handleChangeDeperibile}>
                        {whareHouse.garnishS.map((food) => (
                            <option key={food.name} value={food.name}>{food.name} - {food.um}</option>
                        ))}
                        <option value="">+Aggiungi</option>
                    </select>

                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                    <input type="text" id="imInput" placeholder="UM" className="form-control me-2" value={localItem.um || ''} onChange={handleChangeUm} />

                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeFlavour}>
                        {flavours.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                    </select>
                </div>
            </div>        
        </>
    );
}

export default RowDeperibileCarico;
