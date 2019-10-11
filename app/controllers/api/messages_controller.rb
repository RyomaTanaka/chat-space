class Api::MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    group = Group.find(params[:group_id])
    last_message_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > #{last_message_id}")
  end
end