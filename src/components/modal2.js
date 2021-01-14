// class ModalContainer extends Component {
//     componentDidMount() {
//        const { startOpen } = this.props;
   
//        if (startOpen) {
//          this.handleOpen();
//        }
//      }
   
//    handleOpen = () => this.setState({ modalOpen: true });
   
//    handleClose = () => this.setState({ modalOpen: false });
//    render() {
//      return (
//         <Modal open={this.state.modalOpen} onClose={this.handleClose} />
//      )
//    }


   constructor(props) {
    super(props);
    this.closeModal=this.closeModal.bind(this)
    state={ isOpen: true }
 }

 closeModal() {
      this.setState({isOpen: !this.state.isOpen});
   }

   render() {
    return (
       <Modal 
          open={this.props.open}
          id="add-camera-form" 
          trigger={<Button id="color-0093ee border-color-0093ee" 
          basic 
          icon="video-camera" 
          size="large"></Button>}
       >
          <Header icon='cube' content='New Object' />
          <Modal.Content>
             <AddCameraForm closeModal={this.closeModal} />
          </Modal.Content>
       </Modal>
    )
 }
}