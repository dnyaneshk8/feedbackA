module.exports = survey => {
	return `<div style="text-align:center">
			<h3>Feedback app</h3>
			<h5>Please reply, Your feedback is important to us!</h5>
			<p> ${survey.body} </p>
			<a href="http://localhost:3000/api/surveys/${survey.id}/yes">Yes</a>
			<a href="http://localhost:3000/api/surveys/${survey.id}/no">No</a>


			</div>`;
};
