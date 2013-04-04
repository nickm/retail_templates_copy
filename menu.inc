<% if @page.site.pages.count > 1 %>
	<nav id="mainnav">
		<div class="mainnav_false_back"></div>
		<div class="handle">
			<i class="icon"></i>MENU
		</div>
		<ul>
			<% @page.site.pages.all.each do |nav_item| %>
				<% unless nav_item.page_elements('main_menu_status') && nav_item.page_elements('main_menu_status', :selected) == 'exclude'  %>
					<li><a href="<%= nav_item.relative_url %>.html"><%= nav_item.name %></a></li>
				<% end %>
			<% end %>
		</ul>
	</nav>
<% end %>
