require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  let(:group) { create(:group) }
  let(:user) { create(:user) }
  let(:params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message)} }
  
  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'redners index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    context 'can save' do
      it 'is valid text' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid image' do
        expect(build(:message, text: nil)).to be_valid
      end

      it 'is valid text and image' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, text: nil, image: nil)
        message.valid?
        expect(message.errors[:text]).to include('を入力してください')
      end

      it 'is invalid without content and image' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invalid without content and image' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end


    context 'log in' do
      before { login user }

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { {group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil)} }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
