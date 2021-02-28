$(function() {
	$("button").button()
	$(".toolbar_line_all").hide()
	$(".sidebar_content").hide()
	$(".toolbar_buttonset").buttonset()
	
	$("#toolbar_fontsize_dec").button({
		icons: {primary: "ui-icon-minus"},
		text: false
	})

	$("#toolbar_fontsize_inc").button({
		icons: {primary: "ui-icon-plus"},
		text: false
	})
	
	$("#toolbar_splitter_left").button({
		icons: {primary: "ui-icon-carat-1-w"},
		text: false
	})

	$("#toolbar_splitter_right").button({
		icons: {primary: "ui-icon-carat-1-e"},
		text: false
	})
})