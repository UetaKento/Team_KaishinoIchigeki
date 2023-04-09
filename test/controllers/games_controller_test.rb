require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  test "should get top" do
    get games_top_url
    assert_response :success
  end

  test "should get play" do
    get games_play_url
    assert_response :success
  end

  test "should get result" do
    get games_result_url
    assert_response :success
  end
end
