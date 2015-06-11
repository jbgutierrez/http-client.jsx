#!/usr/bin/env ruby
require 'bundler/setup'

require "sinatra/base"
require "sinatra/reloader"
require 'sinatra/contrib'

require 'json'

class Server < Sinatra::Application
  register Sinatra::Reloader
  register Sinatra::MultiRoute

  before do
    unless env['HTTP_X_AUTH_TOKEN']
      status 403
      halt "Access denied"
    end
  end

  route :get, :post, :delete, :patch, :put, :head, :options, '/' do
    data = request.media_type == "application/json" ? JSON.parse(request.body.read) : params
    ok =
      data['foo'] == 'hello' &&
      data['bar'] == 'world' &&
      env['HTTP_FOO'] == 'BAR'

    status ok ? 200 : 400
    ok ? "Pass" : 'Fail'
  end

  get '/echo' do
    data = request.media_type == "application/json" ? JSON.parse(request.body.read) : params
    data.to_json
  end

  get '/10000-stars' do
    "*" * 10000
  end

  get '/timeout' do
    sleep 10
  end

  run!

end
