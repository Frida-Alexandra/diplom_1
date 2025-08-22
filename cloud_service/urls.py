from django.urls import path, include
from cloud_service.cloud.views.user_view import (
    RegistrUserView,
    get_detail_user_list,
    delete_user,
)
from cloud_service.cloud.views.file_views import FileView
from cloud_service.cloud.views.auth_view import (
    login_view,
    get_csrf_token,
    me_view,
    logout_view,
)
from cloud_service.cloud.views.file_transfer_view import get_link, get_file

urlpatterns = [
    path("api/auth/login/", login_view),
    path("api/auth/logout/", logout_view),
    path("api/auth/get_csrf/", get_csrf_token),
    path("api/auth/me/", me_view),
    path("api/detail_users_list/", get_detail_user_list),
    path("api/delete_user/<int:user_id>/", delete_user),
    path("api/registr/", RegistrUserView.as_view()),
    path("api/files/", FileView.as_view()),
    path("api/link/", get_link),
    path("api/link/<str:link>/", get_file),
    path("", include("frontend.urls")),
]
