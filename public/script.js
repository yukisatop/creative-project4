var app = new Vue({
    el: '#app',
    data: {
	notes: [],
	text: '',
	important: false,
    },
    created: function() {
	this.getnotes();
    },
    computed: {
    },
    methods: {
	getnotes: function() {
	    axios.get("/api/notes").then(response => {
		this.notes = response.data;
		console.log(response.data);
		return true;
	    }).catch(err => {
	    });
	},
	addnote: function() {
	    axios.post("/api/notes", {
		text: this.text,
		important: this.important,
	    }).then(response => {
		this.text = "";
		this.important = false;
		this.getnotes();
		return true;
	    }).catch(err => {
	    });
	},
	deletenote: function(note) {
	    axios.delete("/api/notes/" + note.id).then (response => {
		this.getnotes();
	    }).catch(err => {
	    });
	},
	toggleImportance: function(note) {
	    console.log(note.important);
	    axios.put("/api/notes/" + note.id, {
		text: note.text,
		important: !note.important
	    }).then (response => {
		this.getnotes();
		return true;
	    }).catch(err =>{
	    });
	},
	importanceClass: function(note){
	    if (note.important === true){
		return 'important';
	    }
	    else {
		return 'NotImportant';
	    }
	}
    },
    directives: {
	//cursor automatically in textbox on load
	focus: {
	    inserted: function (el) {
		el.focus()
	    }
	}
    }
});
