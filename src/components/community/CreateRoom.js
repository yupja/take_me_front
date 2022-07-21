import React, {useRef} from "react";


const CreateRoom = () => {
    const name = useRef();
    const RoomName = new FormData()
    //RoomName.append("name", name.current.value);
    return (<div>잘나오나요?</div>)

    // try {
    //     const data = await axios.post('http://43.200.4.1:3000/chat/room',RoomName)
    //     console.log(data)
    // } catch (error) {
    //     console.log(error)
    // }
}
export default CreateRoom