json.name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.text @message.text
json.image @message.image.url
json.user_id @message.user_id