import Modal from 'react-modal';
import { Spinner } from 'react-bootstrap';
const DeleteModel = ({modalIsOpen,setIsOpen,onOk,id,isLoading,setIsLoading})=>{

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    return <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Delete Item"
            >
            <div className="card">
                <div className="card-body">
                <h3>Are you sure to delete ?</h3>
                <div style={{display:'flex',gap:5}}>
                    <button className="btn btn-sm btn-info" onClick={()=>onOk(id)}>
                        {
                            isLoading?<Spinner size="sm" />:"Ok"
                        }
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={()=>{setIsOpen(false);setIsLoading(false);}}>Cancel</button>
                </div>
                
                </div>
            </div>
            </Modal>
}
export default DeleteModel;