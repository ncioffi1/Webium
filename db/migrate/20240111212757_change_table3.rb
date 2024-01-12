class ChangeTable3 < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :session_token
    add_column :users, :session_token, :string, null: :false
    remove_column :users, :password_digest
    add_column :users, :password_digest, :string, null: :false
  end
end
