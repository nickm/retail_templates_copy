<%
	primary_color = @page.site.extra_attributes.find_by_name("Menu and Buttons").try(:value) || '#FDB415'
	primary_text_color = @page.site.extra_attributes.find_by_name("Text on Menu and Buttons").try(:value) || '#fff'

	secondary_color = @page.site.extra_attributes.find_by_name("Background Colour").try(:value) || '#10BDE7'
	secondary_text_color = @page.site.extra_attributes.find_by_name("Text on Background Colour").try(:value) || '#fff'
%>
<style>
	a.btn,
	#mainnav li,
	#mainnav li:last-child:after,
	#mainnav .handle,
	#mainnav .mainnav_false_back {
		background-color: <%= primary_color %>;
	}

	a.btn,
	#mainnav li,
	#mainnav li:last-child:after,
	#mainnav .handle,
	#mainnav a {
		color: <%= primary_text_color %>;
	}

	#ticketing footer,
	#ticketing .price-conditions,
	#product-list .product-description,
	#dual-image-product footer {
		background-color: <%= secondary_color %>;
	}

	#ticketing footer,
	#ticketing .price-conditions,
	#product-list .product-description,
	#dual-image-product footer {
		color: <%= secondary_text_color %>;
	}
</style>