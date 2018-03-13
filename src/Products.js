import React from 'react';

const Products = ({ makeRegular,regulars, specials, makeSpecial, captureSelection }) =>{

  return(
    <div>
      <div style={{ display: 'flex' }}>
        <div style={ { flex: 1 }}>
          <h2>Regular Products</h2>
          <form onSubmit={ makeSpecial }>
          <select onChange={ captureSelection }>
            <option value='-1'>--choose--</option>
            { regulars.map(regular =>
              (
                <option key={ regular.id } value={ regular.id }>
                  { regular.name }
                </option>
              )
            )}
          </select>
          <button>Make Special</button>
          </form>
        </div>
        <div style={ { flex: 1 }}>
          <h2>Special Products</h2>
          <form onSubmit={ makeRegular }>
          <select onChange={ captureSelection }>
            <option value='-1'>--choose--</option>
            { specials.map(special =>
              (
                <option key={ special.id } value={ special.id }>
                  { special.name }
                </option>
              )
            )}
          </select>
          <button>Make Regular</button>
          </form>
        </div>
      </div>
    </div>
  )

}

export default Products;
