import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function LoginForm() {
  const [count, setCount] = useState(0)

  return (
    <div class="container h-100">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-5 offset-0 offset-md-4">
            <div class="card border-0 shadow-lg rounded-4" data-controller="modal-form login" data-action="turbo:submit-end->login#submitEnd turbo:submit-start->login#submitStart"> 
                <div class="card-body p-5">
                    <h2 class="mb-3">Sign up</h2>
                    <%# <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> %>
                    <%= form_for(resource, as: resource_name, url: registration_path(resource_name), data: { modal_form_target: "form"}) do |f| %>
                        <div class="mb-3">
                            <%= f.label :name, class: "form-label" %><br />
                            <%= f.text_field :name, autofocus: true, autocomplete: "name", class: "form-control" %>
                        </div>
                        <div class="mb-3">
                            <%= f.label :email, class: "form-label" %><br />
                            <%= f.email_field :email, autofocus: true, autocomplete: "email", class: "form-control" %>
                        </div>
                        <div class="mb-3">
                            <%= f.label :password, class: "form-label" %>
                            <% if @minimum_password_length %>
                            <em>(<%= @minimum_password_length %> characters minimum)</em>
                            <% end %><br />
                            <%= f.password_field :password, autocomplete: "new-password", class: "form-control" %>
                        </div>
                        <div class="mb-3">
                            <%= f.label :password_confirmation, class: "form-label" %><br />
                            <%= f.password_field :password_confirmation, autocomplete: "new-password", class: "form-control" %>
                        </div>

                        <div class="d-grid gap-2 col-12 mx-auto">
                            <button type="button" class="btn btn-primary" data-login-target="button" data-action="modal-form#submitModalForm">Sign Up</button>
                            <%#= f.submit "Log in", class: "btn btn-primary" %>
                        </div>
                        <%= render "devise/shared/links" %>
                    <% end %>
                </div>
            </div>
            </div>
        </div>
    </div>

  )
}

export default LoginForm

// authenticity_token: GtTbBzSW8Tzllm_lVU4jEdjeSXoImuJQUz323C0d2QiaaO9s0xJK2k9XGhrNR9LdOyenbm3O32fjn1LpBel-vg
// user[email]: atul612@gmail.com
// user[password]: 12345678
// user[remember_me]: 0