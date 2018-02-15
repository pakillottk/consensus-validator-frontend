const styles = horizontal => {
    return {
        wrapper: {

        },
        container: {
            display: 'flex',
            flexDirection: horizontal ? 'row' : 'column'
        },
        item: {
            textAlign: 'center'
        }
    }
}
export default styles