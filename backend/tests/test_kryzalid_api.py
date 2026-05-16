"""Backend API tests for Institut Kryzalid (FastAPI + MongoDB).
Tests health, root, reservations CRUD, and verifies no /api/calendar/* endpoints exist.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://spa-connect-4.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ----- Health & Root -----
class TestHealthAndRoot:
    def test_health_endpoint(self, api_client):
        r = api_client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "healthy"
        assert data.get("service") == "Institut Kryzalid"

    def test_root_endpoint(self, api_client):
        r = api_client.get(f"{API}/", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "message" in data
        assert "Kryzalid" in data["message"]


# ----- Calendar endpoints should NOT exist -----
class TestCalendarRemoved:
    @pytest.mark.parametrize("path", [
        "/calendar", "/calendar/", "/calendar/events", "/calendar/availability",
        "/calendar/slots", "/calendar/book"
    ])
    def test_calendar_endpoints_404(self, api_client, path):
        r = api_client.get(f"{API}{path}", timeout=15)
        assert r.status_code == 404, f"Expected 404 for {path}, got {r.status_code}: {r.text[:200]}"


# ----- Reservations CRUD -----
class TestReservations:
    created_id = None

    def test_list_reservations(self, api_client):
        r = api_client.get(f"{API}/reservations", timeout=15)
        assert r.status_code == 200, r.text
        assert isinstance(r.json(), list)

    def test_create_reservation(self, api_client):
        payload = {
            "nom": "TEST_AutomatedUser",
            "email": "test_automation@example.com",
            "telephone": "+41780000000",
            "massage": "relaxant",
            "date": "2026-02-15T10:00:00",
            "timeSlot": "10:00",
            "message": "TEST entry - automated",
            "status": "pending",
        }
        r = api_client.post(f"{API}/reservations", json=payload, timeout=15)
        assert r.status_code in (200, 201), r.text
        data = r.json()
        assert "id" in data
        assert data["nom"] == payload["nom"]
        assert data["email"] == payload["email"]
        assert data["massage"] == payload["massage"]
        TestReservations.created_id = data["id"]

    def test_get_reservation_by_id(self, api_client):
        rid = TestReservations.created_id
        if not rid:
            pytest.skip("No reservation created in previous step")
        r = api_client.get(f"{API}/reservations/{rid}", timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["id"] == rid
        assert data["nom"] == "TEST_AutomatedUser"

    def test_update_reservation_status(self, api_client):
        rid = TestReservations.created_id
        if not rid:
            pytest.skip("No reservation created")
        # status passed as query param due to FastAPI signature
        r = api_client.patch(f"{API}/reservations/{rid}/status", params={"status": "confirmed"}, timeout=15)
        assert r.status_code == 200, r.text
        # Verify persistence
        g = api_client.get(f"{API}/reservations/{rid}", timeout=15)
        assert g.status_code == 200
        assert g.json().get("status") == "confirmed"

    def test_get_nonexistent_reservation_404(self, api_client):
        r = api_client.get(f"{API}/reservations/nonexistent-id-xyz", timeout=15)
        assert r.status_code == 404

    def test_delete_reservation(self, api_client):
        rid = TestReservations.created_id
        if not rid:
            pytest.skip("No reservation created")
        r = api_client.delete(f"{API}/reservations/{rid}", timeout=15)
        assert r.status_code in (200, 204), r.text
        # Verify gone
        g = api_client.get(f"{API}/reservations/{rid}", timeout=15)
        assert g.status_code == 404
