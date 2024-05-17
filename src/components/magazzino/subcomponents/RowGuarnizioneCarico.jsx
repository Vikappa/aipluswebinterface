import { useDispatch, useSelector } from "react-redux";
import { setNewItemCaricoType, setDeperibileName, setFlavour, setQuantita, setUm, setColor } from "../../../redux/reducers/newItemCaricoReducer";


const RowGuarnizioneCarico = function(){

    const whareHouse = useSelector(state => state.wharehouse)
    const dispatch = useDispatch();
    const localItem = useSelector(state => state.newItemCarico.newItem)
    const flavours = useSelector(state => state.flavours.flavours);
    const colours = useSelector(state => state.colours.colours);

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value))
    }

    const handleChangeColor = (e) => {
        dispatch(setColor(e.target.value))
    }

    const handleChangeFlavour = (e) => {
        dispatch(setFlavour(e.target.value));
    }

    const handleChangeGarnish = (e) => {
        const selectedGarnish = e.target.value;
        dispatch(setDeperibileName(selectedGarnish))

        const garnishItem = whareHouse.garnishShortLine.find(ganrnish => ganrnish.name === selectedGarnish);
        if (garnishItem) {
            dispatch(setUm(garnishItem.um))
        }
    }
    
    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeUm = (e) => {
        dispatch(setUm(e.target.value));
    }

    return(
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="shortlinesextra" className="form-control me-2" value={localItem.deperibileName} onChange={handleChangeGarnish}>
                        {whareHouse.garnishShortLine.map((food) => (
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
                    <select id="flavourSelect" value={localItem.color} className="form-control me-2" onChange={handleChangeColor}>
                        {colours.map((color) => (
                            <option key={color.name} value={color.name}>{color.name}</option>
                        ))}
                    </select>
                </div>
            </div>        
        </>
    )
}
export default RowGuarnizioneCarico