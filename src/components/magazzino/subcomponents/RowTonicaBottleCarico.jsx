import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { setNewItemCaricoType, setGinBrand, setFlavour, setNome, setQuantita, setVolume } from "../../../redux/reducers/newItemCaricoReducer";

const RowTonicaBottleCarico = function(){

    const tonicaBrands = useSelector(state => state.tonicBrand.tonicBrands)
    const localItem = useSelector(state => state.newItemCarico.newItem);
    const dispatch = useDispatch();

    const handleChangeTipo = (e) => {
        dispatch(setNewItemCaricoType(e.target.value));
    }

    const handleChangeTonicBrand = (e) => {
        dispatch(setGinBrand(e.target.value));
    }

    const handleChangeTonicFlavour = (e) => {
        dispatch(setFlavour(e.target.value));
    }

    const handleChangeNome = (e) => {
        dispatch(setNome(e.target.value));
    }

    const handleChangeQuantita = (e) => {
        dispatch(setQuantita(e.target.value));
    }

    const handleChangeVolume = (e) => {
        dispatch(setVolume(e.target.value));
    }


    return(
        <>
            <div className="d-flex flex-column">
                <div className="d-flex mb-2">
                    <select id="tipoProdotto" className="form-control me-2" value={localItem.tipo} onChange={handleChangeTipo}>
                        <option value="Bottiglia di tonica">Bottiglia di tonica</option>
                        <option value="Bottiglia di gin">Bottiglia di Gin</option>
                        <option value="Alimento deperibile">Alimento deperibile</option>
                        <option value="Guarnizione">Guarnizione</option>
                    </select>

                    <select id="tonicaBrands" className="form-control me-2" value={localItem.tonicaBrands} onChange={handleChangeTonicBrand}>
                        {tonicaBrands.map((brand) => (
                            <option key={brand.name} value={brand.name}>{brand.name}</option>
                        ))}
                        <option value="">+Aggiungi</option>
                    </select>

                </div>

                <div className="d-flex mb-2">
                    <input type="text" id="tonicName" placeholder="Nome Tonica" className="form-control me-2" value={localItem.nome || ''} onChange={handleChangeNome} />
                    <input type="number" id="volume" placeholder="Volume (ml)" className="form-control me-2" value={localItem.volume || ''} onChange={handleChangeVolume} />
                </div>

                <div className="d-flex mb-2">
                    <input type="number" id="quantity" placeholder="Quantità" className="form-control me-2" value={localItem.quantita || ''} onChange={handleChangeQuantita} />
                    <select id="flavourSelect" value={localItem.flavour} className="form-control me-2" onChange={handleChangeTonicFlavour}>
                        {tonicaBrands.map((flavour) => (
                            <option key={flavour.name} value={flavour.name}>{flavour.name}</option>
                        ))}
                    </select>

                </div>
                
            </div>        
        </>
    )
}

export default RowTonicaBottleCarico