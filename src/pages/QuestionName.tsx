const QuestionName = (props:any) => {
    const question_arr = props.question && (props.question).split(props.underline);
    return (
        <p className="word" title="noun">
            {question_arr ? question_arr[0] : ''}
            <u>{props.underline}</u>
            {question_arr ? question_arr[1] : ''}
        </p>
    )
}

export default QuestionName