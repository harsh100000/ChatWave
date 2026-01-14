import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  return (
    <div className={`w-full border rounded-lg p-1 flex`}>
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  )
}

export default ChatBox