const PriceTag = ({ price }) => {
    
    return (
        <div>
            <h2 style={{ 
                backgroundColor: 'var(--primary)', 
                border: '3px solid black', 
                textAlign: 'center',
                padding: '5px'
            }}>
                💰 ${price}
            </h2>
        </div>
    );
}

export default PriceTag;